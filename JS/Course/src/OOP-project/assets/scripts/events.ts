const buttonElement = document.querySelector('button') as HTMLButtonElement;

const buttonClickHandler = (event: MouseEvent) => {
  event.stopPropagation(); // Stops the listeners registered on any parent elements
  console.log('Button is clicked...');
  console.log(event);
  // event.target.disabled = true; // Event.target gives exact element on which event is triggered
};

// buttonElement.onclick = buttonClickHandler;

buttonElement.addEventListener('click', buttonClickHandler);
// buttonElement.addEventListener('mouseenter', buttonClickHandler);

// setTimeout(() => {
//   buttonElement.removeEventListener('click', buttonClickHandler);
// }, 2000);

const form = document.querySelector('form');
form?.addEventListener('submit', event => {
  event.preventDefault();
  console.log(event);
});

const div = document.querySelector('div');
div?.addEventListener(
  'click',
  () => {
    console.log('Div is clicked!!!');
  }
  // true // To make the Div eventlistener to execute on capture phase before button event listener
);
