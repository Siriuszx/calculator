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
    if (INPUT_OPERANDS.includes(inputType) ||
        INPUT_HIGH_OPERATORS.includes(inputType) ||
        INPUT_LOW_OPERATORS.includes(inputType)) {
        inputValue += inputType;
        updInputField(true);
    } else {
        updInputField(false);
    }
};
/*
OPERATE function
    CREATE buffer function
    SPLIT string into array
    GO through the array and define operator precedence
    DO operations with high precedence first
    ITERATE until there are no items left to operate on in input array.
        WHEN operation is done, remove 3 elements that taking part in the operation, replace with result
*/
const operate = function () {
    let buffer = 0;
    let strArr = inputValue.split('');
}

const getPrecedenceIndex = function () {
    let strArr = inputValue.split('');

    for (let i = 0; i < strArr.length; i++) {
        if (INPUT_HIGH_OPERATORS.includes(strArr[i])) {
            return i;
        }
    }

}

addInput('1');
addInput('+');
addInput('2');
addInput('*');
addInput('3');


console.log(inputValue);
console.log(getPrecedenceIndex());