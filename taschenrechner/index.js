import inputEvent from './inputRestrictions.js';
import calcComplexExpression from './operators.js';

//previous calculations
let calculations = []
let newInput = true
const input = document.getElementById('input')

function getResult(expression) {
    let res = calcComplexExpression(expression);
    console.log(res)
    if (!isNaN(res)){
        input.value = res;
    } else {
        input.value = 'Error'
        Error();
    }
}
function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }
    else if (input.createTextRange) {
        const range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    }
}

function setCaretToPos (input, pos) {
    setSelectionRange(input, pos, pos);
}

document.querySelectorAll('.num-cell, .oper-cell')
    .forEach((el) => {
        el.addEventListener('click', function () {
            if(newInput){
                input.value = ''
                input.focus()
            }
            const caretPos = input.selectionStart
            switch (this.innerText) {
                case '=':
                        calculations.push({calc:input.value, res: calcComplexExpression(input.value)})
                        getResult(input.value)
                        newInput = true
                    break;
                case 'Ans':
                        if (calculations.length > 0) {
                            const res = calculations[calculations.length - 1].res
                            input.value = input.value.slice(0, caretPos) + res + input.value.slice(caretPos)
                            setCaretToPos(input, caretPos + res.length)
                        }
                    break;
                case 'DEL':
                    let arr = input.value.split('')
                    arr.splice(caretPos - 1, 1)
                    input.value = arr.join('')
                    setCaretToPos(input, caretPos)
                    break;
                default:
                    input.value = input.value.slice(0, caretPos) + this.innerText + input.value.slice(caretPos)
                    input.focus();
                    setCaretToPos(input, caretPos + 1)
                    newInput = false
            }
        })
    })