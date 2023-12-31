const allBtns = document.querySelectorAll('.button');
const inputField = document.querySelector('.calc-field');
const mathBtns = document.querySelectorAll('.digit,.operation');
const equalsBtn = document.querySelector('#equals');
const resetBtn = document.querySelector('#reset');
const clearBtn = document.querySelector('.clear');
const undoBtn = document.querySelector('#undo');
const floatBtn = document.querySelector('#float');

const INPUT_OPERANDS = '0123456789';
const INPUT_HIGH_OPERATORS = '*/';
const INPUT_LOW_OPERATORS = '+-';

let inputValue = '';

const doBasicMath = {
    '+': (a, b = 0) => +a + +b,
    '-': (a, b = 0) => +a - +b,
    '*': (a, b = 0) => +a * +b,
    '/': (a, b = 0) => +a / +b,
};

function resetCalc() {
    inputValue = '';
    inputField.textContent = inputValue;
}

function addInput(e, key) {
    let input = this.textContent || key;
    let strArr = inputValue.split(' ');

    if (('.' + INPUT_OPERANDS).includes(input)) {
        if (strArr == '' || ('.' + INPUT_OPERANDS).includes(strArr[strArr.length - 1][strArr[strArr.length - 1].length - 1])) {
            strArr[strArr.length - 1] += input;
        } else {
            strArr.push(input);
        }
    } else if (inputValue) {
        if ((INPUT_HIGH_OPERATORS + INPUT_LOW_OPERATORS).includes(strArr[strArr.length - 1])) {
            strArr.splice(strArr.length - 1, 1, input);
            inputValue = strArr.join(' ');
        } else {
            strArr.push(input);
        }
    }

    inputValue = strArr.join(' ');
    inputField.textContent = inputValue;
}

function addFloat() {
    let strArr = inputValue.split(' ');

    if (('.' + INPUT_OPERANDS).includes(strArr[strArr.length - 1][strArr[strArr.length - 1].length - 1])) {
        if (Number.isInteger(+strArr[strArr.length - 1])) {
            if (strArr[strArr.length - 1][strArr[strArr.length - 1].length - 1] !== '.') {
                strArr[strArr.length - 1] += '.';
                console.log(strArr[strArr.length - 1][strArr[strArr.length - 1].length - 1]);
            }
        }
    }

    inputValue = strArr.join(' ');
    inputField.textContent = inputValue;
}

function undoInput() {
    let strArr = inputValue.split(' ');

    strArr.splice(strArr.length - 1, 1);

    inputValue = strArr.join(' ');
    inputField.textContent = inputValue;
}

function btnCallHandler(e) {
    let input = e.key;

    if ((INPUT_OPERANDS + INPUT_HIGH_OPERATORS + INPUT_LOW_OPERATORS).includes(input)) {
        addInput(e, input);
    } else if (input === '.') {
        addFloat(e);
    } else if (input === 'Clear') {
        resetCalc();
    } else if (input === 'Backspace') {
        undoInput();
    } else if (input === '=') {
        operate();
    }
}

// In order to perform operation on string that contains sequence of math operations
// we divide whole string into array and look for operators first to define operator
// precedence. 
// To avoid errors we perform operation first and then replace operands and
// operator with the result in the array.
function operate() {
    let buffer = 0;
    let strArr = inputValue.split(' ');
    let curPrecIdx = getPrecedenceIndex(strArr);

    if (!(INPUT_HIGH_OPERATORS + INPUT_LOW_OPERATORS).includes(strArr[strArr.length - 1])) {
        while (curPrecIdx) {
            buffer = doBasicMath[strArr[curPrecIdx]](strArr[curPrecIdx - 1], strArr[curPrecIdx + 1]);
            strArr.splice(curPrecIdx - 1, 3, buffer);
            curPrecIdx = getPrecedenceIndex(strArr);
        }
    }

    inputValue = strArr.join(' ');
    inputField.textContent = inputValue;
}

function getPrecedenceIndex(strArr) {
    for (let i = 0; i < strArr.length; i++) {
        if (INPUT_HIGH_OPERATORS.includes(strArr[i])) return i;
    }

    for (let i = 0; i < strArr.length; i++) {
        if (INPUT_LOW_OPERATORS.includes(strArr[i])) return i;
    }
}

//Button function mapping

document.addEventListener('keydown', btnCallHandler);

mathBtns.forEach((el) => {
    el.addEventListener('click', addInput);
});

equalsBtn.addEventListener('click', operate);
resetBtn.addEventListener('click', resetCalc);
undoBtn.addEventListener('click', undoInput);
floatBtn.addEventListener('click', addFloat);