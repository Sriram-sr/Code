const unorderedList = document.querySelector('ul');

console.log(`Unordered list is `);
console.log(unorderedList);

console.log(`Children of unordered list `);
console.log(unorderedList?.children);

console.log(`Child nodes of unordered list `);
console.log(unorderedList?.childNodes);

const closestBody = unorderedList?.closest('body');
const closestHead = unorderedList?.closest('head');

console.log(`Closest body to ul is `);
console.log(closestBody);

console.log(`Closest head to ul is `);
console.log(closestHead);

const previousSibling = unorderedList?.previousSibling;
console.log(`Previous sibling to unordered list `);
console.log(previousSibling);

const button = document.querySelector('button');
button?.addEventListener('click', () => {
  unorderedList?.classList.toggle('invisible');
});
