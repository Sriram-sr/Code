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
const cricketList = document.querySelector('.list-item--cricket');
const finalList = document.querySelector('.final-list') as HTMLUListElement;

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

// specialList.innerHTML = '<h1>Modified the list with H1</h1>'; // Replaces the entire list content with H1
const lastSpecialListItem = specialList.lastElementChild;
lastSpecialListItem?.insertAdjacentHTML(
  'afterend',
  '<li>Special last item</li>'
);
const dynamicListItem = document.createElement('li');

specialList.appendChild(dynamicListItem);
dynamicListItem.textContent = 'Dynamically added list item';
specialList.append('Some random string...'); // Can append an element node or any text node

const prependListItem = document.createElement('li');
prependListItem.textContent = 'This list item is inserted via prepend method';
specialList.prepend(prependListItem);

const beforeListItem = document.createElement('li');
beforeListItem.textContent = 'This list item is inserted via before method';
specialList.lastElementChild?.before(beforeListItem);

specialList.firstElementChild?.after(beforeListItem); // Same above list item object will be moved

specialList.firstElementChild?.replaceWith(dynamicListItem);

// Inserting new elements

const newListItem = document.createElement('li');
newListItem.textContent = 'Life';
cricketList?.insertAdjacentElement('afterend', newListItem);

const copiedList = cricketList?.cloneNode(true); // true indicated deep clone of child descendants as well

// Queryselector Vs getElementBy*

const liveNodeList = finalList.querySelectorAll(
  'li'
) as NodeListOf<HTMLLIElement>; // This won't have the latest updated items
const nonLiveNodeList = finalList.getElementsByTagName(
  'li'
) as HTMLCollectionOf<HTMLLIElement>; // This list will be updated with latest updated items

finalList.append(dynamicListItem);

// finalList.remove(); 

finalList.parentElement?.removeChild(finalList); // Better browser support than above remove method
