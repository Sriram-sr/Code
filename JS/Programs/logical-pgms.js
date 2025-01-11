// Leap year

function isLeapYear(year) {
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

function isLeapyear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

console.log(isLeapyear(2024));

// Reverse a string

function reverseString(str) {
  let reversedText = '';

  for (let char of str) {
    reversedText = char + reversedText;
  }

  return reversedText;
}

console.log(reverseString('hello'));

// Approach 2

function reverseString(str) {
  let reversedText = '';

  for (let idx = str.length - 1; idx >= 0; idx--) {
    reversedText += str[idx];
  }

  return reversedText;
}
