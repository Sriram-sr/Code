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