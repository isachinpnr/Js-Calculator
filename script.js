// script.js

let displayValue = '';
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let waitingForSecondOperand = false;

const display = document.getElementById('display');

// Function to update display
function updateDisplay() {
    display.innerText = displayValue;
}

// Function to handle number input
function inputDigit(digit) {
    if (waitingForSecondOperand) {
        displayValue = digit;
        waitingForSecondOperand = false;
    } else {
        displayValue += digit;
    }
}

// Function to handle decimal point
function inputDecimal(dot) {
    if (!displayValue.includes(dot)) {
        displayValue += dot;
    }
}

// Function to handle operator input
function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (currentOperator && waitingForSecondOperand) {
        currentOperator = nextOperator;
        displayValue = `${firstOperand} ${currentOperator} `;
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
        displayValue += ` ${nextOperator} `;
    } else if (currentOperator) {
        secondOperand = inputValue;
        const result = performCalculation[currentOperator](firstOperand, secondOperand);
        displayValue = `${result} ${nextOperator} `;
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    currentOperator = nextOperator;
}

// Object holding operations
const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '%': (firstOperand, secondOperand) => firstOperand % secondOperand,
    'square': (firstOperand) => firstOperand * firstOperand,
    '=': (firstOperand, secondOperand) => secondOperand
};

// Function to reset calculator
function resetCalculator() {
    displayValue = '';
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    waitingForSecondOperand = false;
}

// Event listeners for all buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const { innerText: buttonValue } = event.target;

        if (event.target.classList.contains('num')) {
            inputDigit(buttonValue);
        }

        if (event.target.classList.contains('operator')) {
            handleOperator(buttonValue);
        }

        if (buttonValue === 'AC') {
            resetCalculator();
        }

        if (buttonValue === '.') {
            inputDecimal(buttonValue);
        }

        if (buttonValue === '=') {
            handleOperator(buttonValue);
            currentOperator = null; // Reset operator after '='
        }

        if (buttonValue === 'x²') {
            displayValue = String(performCalculation['square'](parseFloat(displayValue)));
        }

        updateDisplay();
    });
});

// Clear button functionality
document.getElementById('clear').addEventListener('click', () => {
    resetCalculator();
    updateDisplay();
});

// Initial display
updateDisplay();

let temph2 = document.getElementById("temph2");
temph2.innerText = "Basic JavaScript Calculator , Calculate your progress.....";
let inserth2 = document.querySelector("body");
inserth2.before(temph2);
temph2.style.display = "flex";
// temph2.style.alignItems = "center";
temph2.style.justifyContent = "center";
temph2.style.margin = "20px 0px 0px 0px";

