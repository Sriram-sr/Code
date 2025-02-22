// Array methods

const nodeListItems = document.querySelectorAll('li');
const arrayListItems = Array.from(nodeListItems);

const hobbies = ['Music', 'Coding'];
const tasks = ['Do Code', 'Do compute'];

hobbies.unshift('Sports');
hobbies.splice(1, 1, 'Computing', 'Developing');
hobbies.splice(0, 0, 'Music');
hobbies.splice(0, 1); // Deletes one element
hobbies.shift();

const realCopiedArray = hobbies.slice();
const concatenatedArray = hobbies.concat(tasks);

const numbers = [2, 3, 4, 9, 2, 11];
const indexOfTwo = numbers.indexOf(2);
const indexOfTwoFromReverse = numbers.lastIndexOf(2);
const foundValue = numbers.find((number, _idx, _allNumbers) => {
  return number == 9;
});

// numbers.forEach(number => {
//   console.log(number);
// });
const updatedNumbers = numbers.map(number => number * 0.1);

const prices = [9.88, 7.11, 5.32, 6.22, 13.56];
console.log(
  prices.sort((a, b) => {
    if (a > b) {
      return 1;
    } else if (a === b) {
      return 0;
    } else {
      return -1;
    }
  })
);

const filteredPrices = prices.filter(price => price < 6.5);

const sumOfPrices = prices.reduce((prevNum, currNum, _idx, _prices) => {
  return prevNum + currNum;
}, 0);

const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];

const fruitCount = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {} as Record<string, number>);
