const buttons = document.querySelectorAll('.calculator button');
const display = document.createElement('div');
display.className = 'display';
document.body.prepend(display);

let currentInput = '';
let operator = '';
let firstOperand = null;

// --- Operation Functions ---
function appendNumber(value) {
  currentInput += value;
  updateDisplay();
}

function setOperator(op) {
  if (currentInput) {
    firstOperand = parseFloat(currentInput);
    operator = op;
    currentInput = '';
  }
}

function calculate() {
  if (firstOperand !== null && operator && currentInput) {
    const secondOperand = parseFloat(currentInput);
    switch (operator) {
      case '+':
        currentInput = (firstOperand + secondOperand).toString();
        break;
      case '-':
        currentInput = (firstOperand - secondOperand).toString();
        break;
      case '*':
        currentInput = (firstOperand * secondOperand).toString();
        break;
      case '/':
        currentInput = secondOperand !== 0 ? (firstOperand / secondOperand).toString() : 'Error';
        break;
    }
    firstOperand = null;
    operator = '';
    updateDisplay();
  }
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function clearAll() {
  currentInput = '';
  operator = '';
  firstOperand = null;
  updateDisplay();
}

function updateDisplay() {
  display.textContent = currentInput || '0';
}

// --- Button Listener ---
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent.trim();

    if (!isNaN(value) || value === '.') {
      appendNumber(value);
    } else if (['+', '-', '*', '/'].includes(value)) {
      setOperator(value);
    } else if (value === '=') {
      calculate();
    } else if (value.toLowerCase() === 'del') {
      deleteLast();
    } else if (value.toUpperCase() === 'AC') {
      clearAll();
    }
  });
});

// Initial display
updateDisplay();
