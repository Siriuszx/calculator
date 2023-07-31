// Create a new function OPERATE that takes operands and calls an operator function;
// Create a function that updates the input field 'DISPLAY VALUE'
// OPERATION func 12 + 7 - 5 * 3 = should yield 42
// OPERATION EQUALS should take the whole string and convert it to a number.

/*
UPDATE FIELD function just updates input field in DOM
ADD INPUT function that adds context to the input field and validates input 
DO OPERATION function performs basic calculations depending on the type of the operation
OPERATE function
    CREATE buffer function
    SPLIT string into array
    GO through the array and define operator precedence
    ITERATE until there are no items left to operate on in input array.
        DO those operations at indexes first, STORE them in variable
        DO operations that have lesser precedence
        WHEN operation is done remove those elements from array
*/

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

addInput('1');
addInput('+');
addInput('3');
addInput('*');
addInput('3');
addInput('3');
addInput('*');
addInput('1');

operate()
