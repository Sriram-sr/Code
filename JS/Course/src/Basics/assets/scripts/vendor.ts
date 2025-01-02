const userInput = document.getElementById(
  'input-number'
) as HTMLInputElement | null;
const addBtn = document.getElementById('btn-add') as HTMLButtonElement | null;
const subtractBtn = document.getElementById(
  'btn-subtract'
) as HTMLButtonElement | null;
const multiplyBtn = document.getElementById(
  'btn-multiply'
) as HTMLButtonElement | null;
const divideBtn = document.getElementById(
  'btn-divide'
) as HTMLButtonElement | null;

const currentResultOutput = document.getElementById(
  'current-result'
) as HTMLSpanElement | null;
const currentCalculationOutput = document.getElementById(
  'current-calculation'
) as HTMLHeadingElement | null;

function outputResult(result: string, text: string) {
  if (currentResultOutput && currentCalculationOutput) {
    currentResultOutput.textContent = result;
    currentCalculationOutput.textContent = text;
  }
}
