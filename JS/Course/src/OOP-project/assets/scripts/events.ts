const buttonElement = document.querySelector(
  '#generic-button'
) as HTMLButtonElement;
const submitButton = document.querySelector(
  '#submit-button'
) as HTMLButtonElement;

const buttonClickHandler = (event: MouseEvent) => {
  event.stopPropagation(); // Stops the listeners registered on any parent elements
  console.log('Button is clicked...');
  console.log(event);
  // console.log(this); //  Will be the event target (button in this case)
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

const listElement = document.querySelector('ul');

listElement?.addEventListener('click', event => {
  const targetElement = event.target as HTMLElement;
  targetElement.closest('li')?.classList.toggle('highlight');
  console.log(event.currentTarget); // Always be ul where we added the lisetener
  // form?.submit();
  submitButton.click();
});

