const buttonElement = document.querySelector('button') as HTMLButtonElement;

const buttonClickHandler = () => {
  console.log('Button is clicked...');
};

buttonElement.onclick = buttonClickHandler;
