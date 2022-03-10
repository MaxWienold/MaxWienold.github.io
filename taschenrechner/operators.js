'use strict'
const subtract = (a, b) => a - b;
const add = (a, b) => a + b;
const divide = (a, b) => a / b;
const multiply = (a, b) => a * b;

const innermostParanthesis = /\([^()]+\)/;
const implicitMultip = /[^+-/*]\(/;
const multDivRegEx = /([-]?\d+([.,]\d+)?) *[/*] *([-]?\d+([.,]\d+)?)/
const addSubRegEx = /([-]?\d+([.,]\d+)?) *[-+] *([-+]?\d+([.,]\d+)?)/

function calcComplexExpression (complExpr) {
    console.log(complExpr)
    complExpr = insertImplicitMultOperator(complExpr)
    complExpr = changeRegExMatches(complExpr, innermostParanthesis, calcComplexExpression);
    const withoutParanthesis = changeRegExMatches(complExpr, multDivRegEx, parseSimpleExpressionFromString);
    console.log(withoutParanthesis)
    return changeRegExMatches(withoutParanthesis, addSubRegEx, parseSimpleExpressionFromString);

    function changeRegExMatches (complExpr, searchExpr, fn) {
        let exprToChange = complExpr.match(searchExpr);
        console.log(exprToChange)
        while (exprToChange) {
            let exprWithoutParanthesis = trim(exprToChange[0]);
            complExpr = complExpr.replace(exprToChange[0], fn(exprWithoutParanthesis));
            exprToChange = complExpr.match(searchExpr);
        }
        return complExpr
    }

    function insertImplicitMultOperator(complExpr) {
        let exprToChange = complExpr.match(implicitMultip);
        while (exprToChange) {
            complExpr = complExpr.replace(exprToChange[0], exprToChange[0].charAt(0) + '*' + exprToChange[0].charAt(1));
            exprToChange = complExpr.match(implicitMultip);
        }
        return complExpr;
    }

    function trim (str) {
        return str.replace('(', '').replace(')', '').replace(' ', '');
    }
}

function parseSimpleExpressionFromString (str) {
    const operatorIndex = str.match(/[\d)][-/*+]/).index + 1;
    const operator = str.charAt(operatorIndex)
    const firstOperand = parseFloat(str.substring(0, operatorIndex));
    const secondOperand = parseFloat(str.substring(operatorIndex + 1));
    return determineCalcFn(operator)(firstOperand, secondOperand)
}

function determineCalcFn (operator) {
    switch (operator) {
        case '+':
            return add;

        case '-':
            return subtract;

        case '/':
            return divide;

        case '*':
            return multiply;

        default:
            break;
    }
}
export default calcComplexExpression;