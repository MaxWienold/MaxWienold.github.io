'use strict'
//handles the user's menu choices 
let gameFlow = function (params) {
//caching some DOM
    let menu = document.getElementById('menu-difficulty');
    let results = document.getElementById('menu-result');
    let resultHeader = document.getElementById('resHeader');
    let backMenu =  document.getElementById('backMenu');
    let startAgain =  document.getElementById('startAgain');
    let diffiChoices = Array.prototype.slice.call
    (document.getElementsByClassName("difficultyChoice"));
    console.log(diffiChoices);
    



// ---- Event handling ----
    diffiChoices.forEach(element => {
        console.log(element);
        // no click event, because of conflict with hammer's event
        element.addEventListener('mousedown', function (params) { 
            results.style.display = 'none';
            menu.style.display = 'none';
          pubsub.emit('startGame', this.innerHTML);
            console.log(this.innerHTML);
            
        })
    });

    let showMenu = function (params) {
        results.style.display = 'none';
        menu.style.display = 'initial';
                
    }

    backMenu.addEventListener('mousedown', showMenu);

    startAgain.addEventListener('mousedown', () =>{
        results.style.display = 'none';
        menu.style.display = 'none';
        pubsub.emit('startGame')
    }); 




    let showResult = function (bashedMoles) {
        resultHeader.innerHTML = 'You have bashed ' + bashedMoles + ' moles!' 
        results.style.display = 'initial'
        menu.style.display = 'none'
    }
    
    pubsub.subscribe('gameOver', showResult);

    return {

    }

};