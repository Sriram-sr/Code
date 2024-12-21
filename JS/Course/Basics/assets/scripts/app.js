let currentResult = 0;

function add() {
  currentResult += parseInt(userInput.value);
  outputResult(currentResult, '');
  userInput.value = '';
}

function sub() {
  currentResult -= parseInt(userInput.value);
  outputResult(currentResult, '');
  userInput.value = '';
}

function mul() {
  currentResult *= parseInt(userInput.value);
  outputResult(currentResult, '');
  userInput.value = '';
}

function div() {
  currentResult /= parseInt(userInput.value);
  outputResult(currentResult, '');
  userInput.value = '';
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', sub);
multiplyBtn.addEventListener('click', mul);
divideBtn.addEventListener('click', div);
