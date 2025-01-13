/**
 * Program: Leap year
 *
 */

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

  // Approach 2

  // return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

console.log(isLeapYear(1992));

/**
 * Program: Reverse a string
 *
 */

function reverseString(str: string): string {
  // let reversedText = '';

  // for (let char of str) {
  //   reversedText = char + reversedText;
  // }

  // Approach 2

  // for (let idx = str.length - 1; idx >= 0; idx--) {
  //   reversedText += str[idx];
  // }

  // Approach 3
  // reversedText = str.split('').reverse().join('');

  // Approach 4
  if (str === '') {
    return '';
  }

  return reverseString(str.substring(1)) + str[0];

  // return reversedText;
}

console.log(reverseString('hello'));
