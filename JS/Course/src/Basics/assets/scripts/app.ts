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
}

function calculateResult(operatorType: string): void {
  const enteredNumber = getUserInput();
  const previousResult = currentResult;
  let mathOperator: string;
  if (operatorType === 'ADD') {
    currentResult += enteredNumber!;
    mathOperator = '+';
  } else if (operatorType === 'SUB') {
    currentResult -= enteredNumber!;
    mathOperator = '-';
  } else if (operatorType === 'MUL') {
    currentResult *= enteredNumber!;
    mathOperator = '*';
  } else if (operatorType === 'DIV') {
    currentResult /= enteredNumber!;
    mathOperator = '/';
  }
  if (enteredNumber) {
    writeToLog(operatorType, previousResult, currentResult, enteredNumber!);
    createAndWriteOutput(mathOperator!, previousResult, enteredNumber);
  }
}

function add(): void {
  calculateResult('ADD');
}

function subtract(): void {
  calculateResult('SUB');
}

function multiply(): void {
  calculateResult('MUL');
}

function divide(): void {
  calculateResult('DIV');
}

addBtn?.addEventListener('click', add);
subtractBtn?.addEventListener('click', subtract);
multiplyBtn?.addEventListener('click', multiply);
divideBtn?.addEventListener('click', divide);
