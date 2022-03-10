// global game object (IFFE)
//   - mole array
//     - DOM object
//     - isActive
//     - local timer
//     - functions: reset, activate

//   - time
//   - hammer

// 
function randInd(min, max){
    return Math.trunc(min + Math.random()*(max - min));
}
// difficulty levels
let gameObject = function(){
    let diffi = {
        hard: {
            spawnMin: 5,
            spawnMax: 15,
            lifeMin: 5,
            lifeMax: 10,
        },
        medium: {
            spawnMin: 5,
            spawnMax: 15,
            lifeMin: 20,
            lifeMax: 40,
        },
        easy: {
            
            spawnMin: 5,
            spawnMax: 15,
            lifeMin: 40,
            lifeMax: 60,
            
        },
    }
    let chosenDiffi;

    let stats = {
        'time': 0,
        'score': 0,
        'spawnTime': 0,
    }

    //resets the stat values back to default
    let init = function (difficult) {
        if(difficult){
            chosenDiffi = diffi[difficult]; 
        }
        stats.time = 90;
        stats.score = 0;
        stats.spawnTime = randInd(chosenDiffi.spawnMin, chosenDiffi.spawnMax)
        moleElements.forEach(element => {
            element.classList.remove('active');
        })
        
    }


 // caching DOM elements of concern
    let moleElements = Array.prototype.slice.call
    (document.getElementsByClassName("mole"));

    let uiTime = document.getElementById('timeLeft');
    let uiScore = document.getElementById('molesHit');

// holds information about mole Elements
    let mole = function(){
        active = false;
        time = randInd(10,40);
        return {
            time: time,
            active: active,
        }
    }

// links the svg mole elements with our js-objects
    moleElements.forEach(element => {
        element.mole = mole();
        console.log(element.mole.time);
        element.addEventListener('mousedown',  function (){
            if (this.classList.contains('active')) {
                this.classList.toggle('active');
                this.mole.active = false;
                stats.score++;
            
            }

            
        }) 
    });


    let spawnMole = function (timer) {
        //Get all the moles that are inactive
        let hiddenMoles = moleElements.filter(function(elem){  
            return !elem.mole.active;
        })
        if(hiddenMoles.length > 0){ // If there are any, let one spawn
            let index = randInd(0, hiddenMoles.length)
            hiddenMoles[index].mole.active = true;
            hiddenMoles[index].mole.time = timer + randInd(chosenDiffi.lifeMin, chosenDiffi.lifeMax);
            

        }

    }

    let startGame = function (difficult) {
        init(difficult);

        let actionTimer = 0;
        let globalTime = setInterval(function (params) {
            actionTimer++;
            if (actionTimer % 10 == 0 ) {
                stats.time--;
            }
        }, 100)
    
        requestAnimationFrame(loop);

    //is called every frame
        function loop(){
            if (stats.time == 0) {
                cancelAnimationFrame(loop)
                clearInterval(globalTime);
                pubsub.emit('gameOver', stats.score)
                init(difficult);

    
            } else{
                setActive();
                spawn();
                requestAnimationFrame(loop);
            }
            uiTime.innerHTML = stats.time
            uiScore.innerHTML = stats.score
        }
    
        function setActive(){
            moleElements.forEach(element => {
                if (element.mole.time == actionTimer) {
                    element.mole.active = false;
                    element.mole.time = actionTimer + randInd(chosenDiffi.lifeMin, chosenDiffi.lifeMax);
                }
                if (element.mole.active) {
                     element.classList.add('active');
                } else {
                    element.classList.remove('active');
                }
            });
    
    
        }
    
        function spawn(){
            if(actionTimer == stats.spawnTime){
                spawnMole(actionTimer);
                stats.spawnTime = actionTimer + randInd(chosenDiffi.spawnMin, chosenDiffi.spawnMax)
            }
        }
    }

    pubsub.subscribe('startGame', startGame);


// one object to rule them all!
    return {
        moleElems: moleElements,
        start: startGame,
    }
}