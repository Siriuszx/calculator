const inputField = document.querySelector('.calc-field');
const mathBtns = document.querySelectorAll('.digit,.operation');
const equalsBtn = document.querySelector('.equals');
const clearBtn = document.querySelector('.clear');

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

function resetCalc() {
    inputValue = '';
    inputField.textContent = inputValue;
}

function addInput(e) {
    let input = this.textContent;
    let strArr = inputValue.split(' ');

    if (INPUT_OPERANDS.includes(input)) {
        strArr.push(input);
    } else if (strArr) {
        if ((INPUT_HIGH_OPERATORS + INPUT_LOW_OPERATORS).includes(strArr[strArr.length - 1])) {
            strArr.splice(strArr.length - 1, 1, inputValue);
        } else {
            strArr.push(input);
        }
    }

    inputValue = strArr.join(' ');
    inputField.textContent = inputValue;
};


// In order to perform operation on string that contains sequence of math operations
// we divide whole string into array and look for operators first to define operator
// precedence. 
// To avoid errors we perform operation first and then replace operands and
// operator with the result in the array.
function operate() {
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

function getPrecedenceIndex(strArr) {
    for (let i = 0; i < strArr.length; i++) {
        if (INPUT_HIGH_OPERATORS.includes(strArr[i])) return i;
    }

    for (let i = 0; i < strArr.length; i++) {
        if (INPUT_LOW_OPERATORS.includes(strArr[i])) return i;
    }
}

//Button function mapping

mathBtns.forEach((el) => {
    el.addEventListener('click', addInput);
});

equalsBtn.addEventListener('click', operate);
clearBtn.addEventListener('click', resetCalc);