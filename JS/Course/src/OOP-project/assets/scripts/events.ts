const buttonElement = document.querySelector('button') as HTMLButtonElement;

const buttonClickHandler = (event: MouseEvent) => {
  console.log('Button is clicked...');
  console.log(event);
  // event.target.disabled = true; // Event.target gives exact element on which event is triggered
};

// buttonElement.onclick = buttonClickHandler;

// buttonElement.addEventListener('click', buttonClickHandler);
buttonElement.addEventListener('mouseenter', buttonClickHandler);

// setTimeout(() => {
//   buttonElement.removeEventListener('click', buttonClickHandler);
// }, 2000);