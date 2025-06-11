let currentInput = '';
  let previousInput = '';
  let operation = null;

  const display = document.getElementById('display');

  function appendNumber(number) {
    if (currentInput === 'Infinity' || currentInput === 'NaN') return;
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay();
  }

  function setOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
      calculate();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
  }

  function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
      case '+': result = prev + current; break;
      case '-': result = prev - current; break;
      case '*': result = prev * current; break;
      case '/': result = prev / current; break;
      default: return;
    }
    currentInput = result.toString();
    operation = null;
    previousInput = '';
    updateDisplay();
  }

  function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operation = null;
    updateDisplay();
  }

  function updateDisplay() {
    display.textContent = currentInput || '0';
  }

  // Escuchar teclado
  document.addEventListener('keydown', (event) => {
    const key = event.key;
    let button;

    if (!isNaN(key) || key === '.') {
      appendNumber(key);
      button = document.querySelector(`button.number[onclick*="${key}"]`);
    }

    if (key === '+' || key === '-' || key === '*' || key === '/') {
      setOperation(key);
      button = document.querySelector(`button.operator[onclick*="${key}"]`);
    }

    if (key === 'Enter' || key === '=') {
      calculate();
      button = document.querySelector('button.equal');
    }

    if (key === 'Escape' || key === 'c' || key === 'C' || key === 'Delete') {
      clearDisplay();
      button = document.querySelector('button.clear');
    }

    if (button) {
      button.classList.add('active-key');
    }
  });

  document.addEventListener('keyup', () => {
    document.querySelectorAll('button').forEach(btn => {
      btn.classList.remove('active-key');
    });
  });

  // Efecto de click del mouse
  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('mousedown', () => {
      btn.classList.add('active-key');
    });
    btn.addEventListener('mouseup', () => {
      btn.classList.remove('active-key');
    });
    btn.addEventListener('mouseleave', () => {
      btn.classList.remove('active-key');
    });
  });

  // Pantalla de inicio: click para desaparecer y mostrar la calculadora
  const introScreen = document.getElementById('introScreen');
  const calculatorContainer = document.getElementById('calculatorContainer');

introScreen.addEventListener('click', () => {
  introScreen.style.opacity = '0';
  calculatorContainer.classList.add('visible'); // Muestra la calculadora suavemente
  setTimeout(() => {
    introScreen.style.display = 'none';
  }, 500);
});