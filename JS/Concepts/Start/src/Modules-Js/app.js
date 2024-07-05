import { addTwoNumbers } from './helper.js';

const button = document.querySelector('button');
button.addEventListener('click', () => {
  import('./burden.js')
    .then(module => {
      module.displayOnConsole();
    })
    .catch(err => {
      console.log('Error while importing lazy load file', err);
    });
});

console.log('Calling add utility below...');
console.log(addTwoNumbers(2, 9));