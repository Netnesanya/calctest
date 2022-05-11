const numbers = document.querySelectorAll('.num')
const operators = document.querySelectorAll('.operator')
const expressionDisplay = document.querySelector('.calc-display__expression')
const resultDisplay = document.querySelector('.calc-display__result')
const resultButton = document.querySelector('.result')
const backspaceButton = document.querySelector('.backspace')
const clearButton = document.querySelector('.clear')

let expressionVariable = ''
let resultVariable = ''
let operator = ''
let finished = false

const clear = () => {
    expressionVariable = ''
    resultVariable = ''
    operator = null
    finished = false

}

const updateVariable = (number) => {
    if (resultVariable.includes('.') && resultVariable.toString().split('.')[1].length >= 8 ) return;
    if (number === '.' && resultVariable.includes('.')) return

    resultVariable = resultVariable.toString() + number.toString()
}

const backspace = () => {
    if (finished) return
    resultVariable = resultVariable.toString().slice(0, -1)
}

const setOperator = (key) => {
    if (resultVariable === '') return
    if (expressionVariable !== '') {
        calculate()
    }
    operator = key
    expressionVariable = resultVariable
    resultVariable = ''
}

const calculate = () => {
    let expression
    let result
    const prev = parseFloat(expressionVariable)
    const curr = parseFloat(resultVariable)
    if (isNaN(prev - curr)) return

    switch (operator) {
        case '+':
            expression = Number(prev) + Number(curr)
            if (expression.toString().length >= 8) {
                result = expression.toFixed(8)
            } else {
                result = expression
            }
            updateDisplay(operator)
            break;
        case '-':
            expression = Number(prev) - Number(curr)
            if (expression.toString().length >= 8) {
                result = expression.toFixed(8)
            } else {
                result = expression
            }
            updateDisplay(operator)
            break;
        case '÷':
            if (!Number(curr)) {
                clear()
                expressionDisplay.textContent = ''
                resultDisplay.textContent = 'Cannot divide by zero'
                throw new Error('Cannot divide by zero')
            }
            expression = Number(prev) / Number(curr)
            if (expression.toString().length >= 8) {
                result = expression.toFixed(8)
            } else {
                result = expression
            }
            updateDisplay(operator)
            break;
        case '×':
            expression = Number(prev) * Number(curr)
            if (expression.toString().length >= 8) {
                result = expression.toFixed(8)
            } else {
                result = expression
            }
            updateDisplay(operator)
            break;
        case '%':
            expression = (Number(prev) * Number(curr)) / 100
            if (expression.toString().length >= 8) {
                result = expression.toFixed(8)
            } else {
                result = expression
            }
            updateDisplay(operator)
            break;
        default:
            return;
    }
    resultVariable = result
    operator = null
    expressionVariable = ''

}

const updateDisplay = () => {
    resultDisplay.textContent = getDisplayNumber(resultVariable)
    if (operator !== null) {
        expressionDisplay.textContent = `${getDisplayNumber(expressionVariable)} ${operator}`
    } else {
        expressionDisplay.textContent =''
    }
}


const getDisplayNumber =  (number) => {
    const stringVar = number.toString()
    const integerVar = parseFloat(stringVar.split('.')[0])
    let decimalVar = stringVar.split('.')[1]
    let integerDisplay

    if (isNaN(integerVar)) {
        integerDisplay = ''
    } else {
        integerDisplay = integerVar.toLocaleString('en', {
            maximumFractionDigits: 0})
    }
    if (decimalVar != null) {
        return `${integerDisplay}.${decimalVar}`
    } else {
        return integerDisplay
    }
}

numbers.forEach( btn => {
    btn.addEventListener('click', () => {
        updateVariable(btn.textContent)
        updateDisplay()
    })
})
operators.forEach( btn => {
    btn.addEventListener('click', () => {
        setOperator(btn.textContent)
        updateDisplay()
    })
})
resultButton.addEventListener('click', () => {
    if (finished) return
    calculate()
    updateDisplay()
})
clearButton.addEventListener('click', () => {
    clear()
    updateDisplay()
})
backspaceButton.addEventListener('click', () => {
    backspace()
    updateDisplay()
})

window.addEventListener('keypress', event => {
    if (event.key.match(/^\d(\.\d)*$/)) {
        updateVariable(event.key)
        updateDisplay()
    }
})
