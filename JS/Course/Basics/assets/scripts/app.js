let currentResult = 0;

function getUserInput() {
  return parseInt(userInput.value);
}

function createAndWriteOutput(operator, previousResult, enteredNumber) {
  const calcDescription = `${previousResult} ${operator} ${enteredNumber}`;
  outputResult(currentResult, calcDescription);
  userInput.value = '';
}

function add() {
  const enteredNumber = getUserInput();
  const previousResult = currentResult;
  currentResult += enteredNumber;
  createAndWriteOutput('+', previousResult, enteredNumber);
}

function subtract() {
  const enteredNumber = getUserInput();
  const previousResult = currentResult;
  currentResult -= enteredNumber;
  createAndWriteOutput('-', previousResult, enteredNumber);
}

function multiply() {
  const enteredNumber = getUserInput();
  const previousResult = currentResult;
  currentResult *= enteredNumber;
  createAndWriteOutput('*', previousResult, enteredNumber);
}

function divide() {
  const enteredNumber = getUserInput();
  const previousResult = currentResult;
  currentResult /= enteredNumber;
  createAndWriteOutput('/', previousResult, enteredNumber);
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);
