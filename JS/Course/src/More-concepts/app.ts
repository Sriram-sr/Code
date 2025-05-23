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

const nameFragments = ['Max', 'Schrwaz'];
const fullname = nameFragments.join('');

const persons = [
  { name: 'Sriram', age: 24 },
  { name: 'Vijay', age: 25 }
];
const copiedPersons = [...persons];
const realNestedCopiedPersons = persons.map(person => ({ ...person }));
persons.push({ name: 'Harish', age: 27 });
copiedPersons[1].age = 100;

const [firstFruit, secondFruit, ...otherFruits] = fruits;

// Set methods

const userIds = new Set([1, 2, 3, 4, 5]);
console.log(userIds);

// Map

const personData = new Map();
personData.set('Name', 'Sriram');

for (const [key, value] of personData.entries()) {
  console.log(key);
  console.log(value);
}

console.log(personData.size);

// Weak set

let person: { name: string; age: number } | null = {
  name: 'Sriram',
  age: 24
};

const weekStorage = new WeakSet();
weekStorage.add(person);
person = null; // This will lead JS to garbage collect eventhough weekStorage has reference to it.
console.log(weekStorage);

// Factory functions & Closures

let multiplier = 1.05;

const createTaxCalculator = (taxValue: number) => {
  return (amount: number) => {
    console.log(multiplier); // Latest value will be referred
    return amount * taxValue * multiplier;
  };
};

const taxCalculator1 = createTaxCalculator(0.19);
const taxCalculator2 = createTaxCalculator(0.23);

multiplier = 1.1;

console.log(taxCalculator1(100));
console.log(taxCalculator2(2000));

const powerOf: (num: number, pow: number) => number = (
  num: number,
  pow: number
) => {
  return pow === 1 ? num : num * powerOf(num, pow - 1);
};

console.log(powerOf(2, 4));
