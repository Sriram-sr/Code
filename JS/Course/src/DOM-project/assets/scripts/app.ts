const addMovieModal = document.getElementById('add-modal') as HTMLDivElement;
const startAddMovieButton = document.querySelector(
  'header button'
) as HTMLButtonElement;

const toggleMovieModal: () => void = () => {
  addMovieModal.classList.toggle('visible');
};

startAddMovieButton.addEventListener('click', toggleMovieModal);
