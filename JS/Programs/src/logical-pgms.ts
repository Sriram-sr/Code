// Leap year

function isLeapYear(year: number): boolean {
  if (year % 4 === 0) {
    if (year % 100 === 0) {
      if (year % 400 !== 0) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}

console.log(isLeapYear(1992));

// Approach 2

function isLeapyear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

// Reverse a string

function reverseString(str: string): string {
  let reversedText = '';

  for (let char of str) {
    reversedText = char + reversedText;
  }

  return reversedText;
}

// Approach 2

function reversesString(str: string): string {
  let reversedText = '';

  for (let idx = str.length - 1; idx >= 0; idx--) {
    reversedText += str[idx];
  }

  return reversedText;
}

console.log(reversesString('hello'));
