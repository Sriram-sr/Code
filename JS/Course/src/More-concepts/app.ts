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
