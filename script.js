// Create a new function OPERATE that takes operands and calls an operator function;
// Create a function that updates the input field 'DISPLAY VALUE'
// OPERATION func 12 + 7 - 5 * 3 = should yield 42
// OPERATION EQUALS should take the whole string and convert it to a number.

// CHECK status of the string
//     IF user inputs a DIGIT append it to the number string.
//     IF user inputs OPERATION append it to the string.
// GO through the input field
//      IF operation is detected doOperation(item - 1,item + 1,operator);

const inputField = document.querySelector('.calc-field');

const INPUT_OPERANDS = '0123456789';
const INPUT_OPERATORS = '+-*/';

let inputValue = '';

const doOperation = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '=': (a, b) => 0// TODO,
};

const updInputField = function (valid) {
    valid ? inputField.textContent = inputValue : inputField.textContent = 'ERROR';
}

const addInput = function (inputType) {
    if (INPUT_OPERANDS.includes(inputType) || INPUT_OPERATORS.includes(inputType)) {
        inputValue += inputType;
        updInputField(true);
    } else {
        updInputField(false);
    }
};

const operate = function () {
    const splitStr = inputField.split('');

    for (let i = 0; i < splitStr.length; i++) {
        if (INPUT_OPERATORS.includes(splitStr[i])) {
            inputValue = doOperation[splitStr[i]](splitStr[i - 1], splitStr[i + 1]);
        }
    }
}

addInput('1');
addInput('+');
addInput('2');
addInput('3');

console.log(inputValue);
