let display = document.getElementById('result');
let currentInput = '0';
let shouldResetDisplay = false;

function updateDisplay() {
    display.value = currentInput;
}

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        currentInput = '0';
        shouldResetDisplay = false;
    }
    
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function calculate() {
    try {
        let expression = currentInput
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-');
        
        let result = eval(expression);
        
        if (Number.isInteger(result)) {
            currentInput = result.toString();
        } else {
            currentInput = parseFloat(result.toFixed(8)).toString();
        }
    } catch (e) {
        currentInput = 'خطأ';
    }
    shouldResetDisplay = true;
    updateDisplay();
}

// دعم لوحة المفاتيح
document.addEventListener('keydown', function(e) {
    if (e.key >= '0' && e.key <= '9') appendToDisplay(e.key);
    if (e.key === '.') appendToDisplay('.');
    if (e.key === '+') appendToDisplay('+');
    if (e.key === '-') appendToDisplay('-');
    if (e.key === '*') appendToDisplay('*');
    if (e.key === '/') appendToDisplay('/');
    if (e.key === 'Enter' || e.key === '=') calculate();
    if (e.key === 'Backspace') deleteLast();
    if (e.key === 'Escape') clearDisplay();
});

updateDisplay();