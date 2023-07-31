const inputField = document.querySelector('.calc-field');
const buttons = document.querySelectorAll('.button');
const equalsBtn = document.querySelector('.equals');

const INPUT_OPERANDS = '0123456789';
const INPUT_HIGH_OPERATORS = '*/';
const INPUT_LOW_OPERATORS = '+-';

let inputValue = '';

const doBasicMath = {
    '+': (a, b) => +a + +b,
    '-': (a, b) => +a - +b,
    '*': (a, b) => +a * +b,
    '/': (a, b) => +a / +b,
};

const resetCalc = function () {
    inputField = '';
    updInputField(true);
}

const addInput = function (e) {
    if(INPUT_OPERANDS.includes(e)) {
        inputValue += e;
    } else {
        inputValue += ` ${e} `;
    }
    inputField.textContent = inputValue;
};

const operate = function () {
    let buffer = 0;
    let strArr = inputValue.split(' ');
    let curPrecIdx = getPrecedenceIndex(strArr);
    
    while (curPrecIdx) {
        buffer = doBasicMath[strArr[curPrecIdx]](strArr[curPrecIdx - 1], strArr[curPrecIdx + 1]);

        strArr.splice(curPrecIdx - 1, 3, buffer);

        curPrecIdx = getPrecedenceIndex(strArr);
    }

    inputValue = strArr.join(' ');
    inputField.textContent = inputValue;
}

const getPrecedenceIndex = function (strArr) {
    
    for (let i = 0; i < strArr.length; i++) {
        if (INPUT_HIGH_OPERATORS.includes(strArr[i])) return i;
    }

    for (let i = 0; i < strArr.length; i++) {
        if (INPUT_LOW_OPERATORS.includes(strArr[i])) return i;
    }
}

buttons.forEach((el) => {
    el.addEventListener('click', addInput);
});

equalsBtn.addEventListener('click', operate);

addInput('1');
addInput('2');
addInput('*');
addInput('2');
addInput('+');
addInput('1');