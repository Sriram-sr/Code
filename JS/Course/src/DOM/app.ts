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
const sectionElement = document.querySelector('section') as HTMLElement;
const button = document.querySelector('button') as HTMLButtonElement;
const specialList = document.querySelector('.special-list') as HTMLUListElement;

h1Element.textContent = 'New text content!';
h1Element.className = 'dynamic-inserted-class';
h1Element.id = 'dynamic-inserted-id';
h1Element.style.backgroundColor = '#ff1b68';
titleElement.textContent = 'Assignment solved!';

inputElement.setAttribute('input', 'Modified using attribute');

const ulListChildren = unorderedList.children;
const ulListChildNodes = unorderedList.childNodes;
const firstListItem = unorderedList.firstChild; // this will be a text node
const firstListItemElement = unorderedList.firstElementChild;

// Traversing using existing elements

const listParent = firstListItemElement?.parentNode;
const body = firstListItemElement?.closest('body'); // Closest descendant upwards is body for ul
const h1ElementBySibling = unorderedList.previousElementSibling; // previousSibling will return text node
const inputElementBySibling = unorderedList.nextElementSibling;

button?.addEventListener('click', () => {
  sectionElement.classList.toggle('invisible');
});

// Creating new Html elements

// specialList.innerHTML = '<h1>Modified the list with H1'; // Replaces the entire list content with H1
const lastSpecialListItem = specialList.lastElementChild;
lastSpecialListItem?.insertAdjacentHTML(
  'afterend',
  '<li>Before special last item</li>'
);
const dynamicListItem = document.createElement('li') as HTMLLIElement;

specialList.appendChild(dynamicListItem);
dynamicListItem.textContent = 'Dynamically added list item';
