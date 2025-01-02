let currentResult = 0;

type LogEntry = {
  operation: string;
  enteredNumber: number;
  prevResult: number;
  result: number;
};

const logEntries: Array<LogEntry> = [];

function getUserInput(): number | null {
  const inputValue = parseInt(userInput?.value!);
  return isNaN(inputValue) ? null : inputValue;
}

function createAndWriteOutput(
  operator: string,
  previousResult: number,
  enteredNumber: number
) {
  const calcDescription = `${previousResult} ${operator} ${enteredNumber}`;
  outputResult(currentResult.toString(), calcDescription);
  userInput!.value = '';
}

function writeToLog(
  operation: string,
  prevResult: number,
  currResult: number,
  enteredNumber: number
) {
  const logEntry = {
    operation: operation,
    enteredNumber: enteredNumber,
    prevResult: prevResult,
    result: currResult,
  };
  logEntries.push(logEntry);
  console.log(logEntries);
}

function add(): void {
  const enteredNumber = getUserInput();
  const previousResult = currentResult;
  if (enteredNumber) {
    currentResult += enteredNumber;
    writeToLog('ADD', previousResult, currentResult, enteredNumber);
    createAndWriteOutput('+', previousResult, enteredNumber);
  }
}

function subtract(): void {
  const enteredNumber = getUserInput();
  const previousResult = currentResult;
  if (enteredNumber) {
    currentResult -= enteredNumber;
    writeToLog('SUB', previousResult, currentResult, enteredNumber);
    createAndWriteOutput('-', previousResult, enteredNumber);
  }
}

function multiply(): void {
  const enteredNumber = getUserInput();
  const previousResult = currentResult;
  if (enteredNumber) {
    currentResult *= enteredNumber;
    writeToLog('MUL', previousResult, currentResult, enteredNumber);
    createAndWriteOutput('*', previousResult, enteredNumber);
  }
}

function divide(): void {
  const enteredNumber = getUserInput();
  const previousResult = currentResult;
  if (enteredNumber) {
    currentResult /= enteredNumber;
    writeToLog('DIV', previousResult, currentResult, enteredNumber);
    createAndWriteOutput('/', previousResult, enteredNumber);
  }
}

addBtn?.addEventListener('click', add);
subtractBtn?.addEventListener('click', subtract);
multiplyBtn?.addEventListener('click', multiply);
divideBtn?.addEventListener('click', divide);
