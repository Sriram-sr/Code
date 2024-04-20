const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.body.firstElementChild;
const cancelAddMovieButton = addMovieModal?.querySelector('.btn--passive');

const toggleBackdrop: () => void = () => {
  backdrop?.classList.toggle('visible');
};

const toggleMovieModal: () => void = () => {
  addMovieModal?.classList.toggle('visible');
  toggleBackdrop();
};

const backdropClickHandler: () => void = () => {
  toggleMovieModal();
};

startAddMovieButton?.addEventListener('click', toggleMovieModal);
backdrop?.addEventListener('click', backdropClickHandler);
cancelAddMovieButton?.addEventListener('click', toggleMovieModal);
