const inputField = document.querySelector('.calc-field');

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

const updInputField = function (valid) {
    valid ? inputField.textContent = inputValue : inputField.textContent = 'ERROR';
}

const addInput = function (input) {
    if (INPUT_OPERANDS.includes(input) ||
        INPUT_HIGH_OPERATORS.includes(input) ||
        INPUT_LOW_OPERATORS.includes(input)) {
        if (INPUT_OPERANDS.includes(input)) {
            inputValue += input;
        } else {
            inputValue += ` ${input} `;
        }
        updInputField(true);
    } else {
        updInputField(false);
    }
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
    updInputField(true);
}

const getPrecedenceIndex = function (strArr) {
    for (let i = 0; i < strArr.length; i++) {
        if (INPUT_HIGH_OPERATORS.includes(strArr[i])) return i;
    }

    for (let i = 0; i < strArr.length; i++) {
        if (INPUT_LOW_OPERATORS.includes(strArr[i])) return i;
    }
}

