const header = document.getElementById('main-header');
const thirdList = document.querySelector('ul li:last-of-type');
const firstList = document.querySelector('ul li:first-of-type');

const unorderedList = document.querySelector('ul');

const someListItem = unorderedList.querySelectorAll('.list-item');

// console.log(header);
// console.log(thirdList);
// console.log(firstList);

// console.log(someListItem);

header.textContent = 'Complete MERN';
header.style.color = 'red';
header.className = 'header';

const mainComponent = document.querySelector('.main-component');

console.log(mainComponent.childNodes);
console.log(mainComponent.children);

const lastElement = mainComponent.lastElementChild;
console.log(lastElement);

let prevElement = unorderedList.previousElementSibling;
let nextElement = unorderedList.nextElementSibling;

console.log('Previous is ', prevElement);
console.log('Next element to UL is ', nextElement);

console.log('Unordered list\'s first child,');
console.log(unorderedList.firstChild);

console.log('Unordered list\'s first Element child,');
console.log(unorderedList.firstElementChild);

const section = document.querySelector('section');

const tempDiv = document.createElement("div");
tempDiv.style.backgroundColor = 'green';

section.insertAdjacentHTML('beforebegin', '<h1>This header is above it</h1>');
section.insertAdjacentHTML('beforeend', '<h3>This could be it</h3>');
