const h1Element = document.getElementById('main-title') as HTMLHeadElement;
const listItems = document.getElementsByClassName('list-item');
const allListItems = document.querySelectorAll('li');
const firstListItem = document.querySelector('.list-item');
const lastListItem = document.querySelector('ul :last-of-type');

console.log(h1Element);
console.log(firstListItem);
console.log(listItems);
console.log(allListItems);
console.log(lastListItem);
