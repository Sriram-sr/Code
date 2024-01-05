const userInput = document.getElementById('input-number');
const addBtn = document.getElementById('btn-add');
const subtractBtn = document.getElementById('btn-subtract');
const multiplyBtn = document.getElementById('btn-multiply');
const divideBtn = document.getElementById('btn-divide');

const currentResultOutput = document.getElementById(
  'current-result'
) as HTMLHeadingElement;
const currentCalculationOutput = document.getElementById(
  'current-calculation'
) as HTMLHeadingElement;

function outputResult(result: number, text: string) {
  currentResultOutput.textContent = result.toString();
  currentCalculationOutput.textContent = text;
}
