// Array methods

const nodeListItems = document.querySelectorAll('li');
const arrayListItems = Array.from(nodeListItems);

const hobbies = ['Music', 'Coding'];

hobbies.unshift('Sports');
hobbies.splice(1, 1, 'Computing', 'Developing');
hobbies.splice(0, 0, 'Music');
hobbies.splice(0, 1); // Deletes one element
hobbies.shift();

const realCopiedArray = hobbies.slice();