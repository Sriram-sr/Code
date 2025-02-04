const h1Element = document.getElementById('main-title') as HTMLHeadElement;
const listItems = document.getElementsByClassName('list-item');
const allListItems = document.querySelectorAll('li');
const firstListItem = document.querySelector('.list-item');
const lastListItem = document.querySelector('ul :last-of-type');
const inputElement = document.querySelector('input') as HTMLInputElement;

h1Element.textContent = 'New text content!';
h1Element.className = 'dynamic-inserted-class';
h1Element.id = 'dynamic-inserted-id';
h1Element.style.backgroundColor = '#ff1b68';

inputElement.setAttribute('input', 'Modified using attribute');
console.log(inputElement.getAttribute('input'));
