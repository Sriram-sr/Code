const addMovieModal = document.getElementById('add-modal') as HTMLDivElement;
const startAddMovieButton = document.querySelector(
  'header button'
) as HTMLButtonElement;
const backdrop = document.getElementById('backdrop') as HTMLDivElement;
const cancelAddMovieButton = addMovieModal.querySelector(
  '.btn--passive'
) as HTMLButtonElement;
const confirmAddMovieButton =
  cancelAddMovieButton.nextElementSibling as HTMLButtonElement;
const userInputs = addMovieModal.querySelectorAll('input');
const movies = [];

const toggleBackdrop: () => void = () => {
  backdrop.classList.toggle('visible');
};

const toggleMovieModal: () => void = () => {
  addMovieModal.classList.toggle('visible');
  toggleBackdrop();
};

const backdropClickHandler: () => void = () => {
  toggleMovieModal();
};

const cancelAddMovieHandler: () => void = () => {
  toggleMovieModal();
};

const addMovieHandler: () => void = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert('Please enter valid values (rating between 1 and 5).');
    return;
  }
};

startAddMovieButton.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
