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