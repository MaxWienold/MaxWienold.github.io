let inputEvent = (() => {
    const regex = new RegExp(/[\d()/*-+x]/)
    const allowedSpecialKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete', 'Backspace', 'Enter'];
    const input = document.querySelector('#input')
    const resultBtn = document.querySelector('#result')
    input.addEventListener('keyup', (e) => {
        e.stopPropagation()
        const isSpecialKey = allowedSpecialKeys.indexOf(e.key) >= 0;
        if ((!regex.test(e.key) && !isSpecialKey) || e.ctrlKey) {
            e.preventDefault();
            return false;
        } else if (e.key == 'Enter'){
            resultBtn.click()
        }
    }
    )
})()

export default inputEvent;