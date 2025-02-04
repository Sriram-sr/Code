const h1Element = document.getElementById('main-title') as HTMLHeadElement;
const listItems = document.getElementsByClassName(
  'list-item'
) as HTMLCollectionOf<HTMLLIElement>;
const allListItems = document.querySelectorAll(
  'li'
) as NodeListOf<HTMLLIElement>;
// const firstListItem = document.querySelector('.list-item') as HTMLLIElement;
const lastListItem = document.querySelector(
  'ul :last-of-type'
) as HTMLLIElement;
const inputElement = document.querySelector('input') as HTMLInputElement;
const titleElement = document.querySelector('title') as HTMLTitleElement;
const unorderedList = document.querySelector('ul') as HTMLUListElement;

h1Element.textContent = 'New text content!';
h1Element.className = 'dynamic-inserted-class';
h1Element.id = 'dynamic-inserted-id';
h1Element.style.backgroundColor = '#ff1b68';
titleElement.textContent = 'Assignment solved!';

inputElement.setAttribute('input', 'Modified using attribute');
console.log(inputElement.getAttribute('input'));

const ulListChildren = unorderedList.children;
const ulListChildNodes = unorderedList.childNodes;
const firstListItem = unorderedList.firstChild; // this will be a text node
const firstListItemElement = unorderedList.firstElementChild;

console.log(firstListItem);
console.log(firstListItemElement);
