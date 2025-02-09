const addMovieModal = document.getElementById('add-modal') as HTMLDivElement;
const deleteMovieModal = document.getElementById(
  'delete-modal'
) as HTMLDivElement;
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
const entryText = document.getElementById('entry-text') as HTMLSelectElement;

interface Movie {
  id: string;
  title: string;
  imageUrl: string;
  rating: number;
}

const movies: Array<Movie> = [];

const toggleBackdrop: () => void = () => {
  backdrop.classList.toggle('visible');
};

const closeAddMovieModal: () => void = () => {
  addMovieModal.classList.remove('visible');
};

const showMovieModal: () => void = () => {
  addMovieModal.classList.add('visible');
  toggleBackdrop();
};

const clearMovieInputs: () => void = () => {
  for (const userInput of userInputs) {
    userInput.value = '';
  }
};

const backdropClickHandler: () => void = () => {
  closeAddMovieModal();
  closeDeleteMovieModal();
  clearMovieInputs();
};

const cancelAddMovieHandler: () => void = () => {
  closeAddMovieModal();
  toggleBackdrop();
  clearMovieInputs();
};

const closeDeleteMovieModal: () => void = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible');
};

const updateUI: () => void = () => {
  if (movies.length === 0) {
    entryText.style.display = 'block';
  } else {
    entryText.style.display = 'none';
  }
};

const deleteMovieHandler: (id: string) => void = movieId => {
  const removeMovieIdx = movies.findIndex(movie => movie.id === movieId);
  if (removeMovieIdx === -1) {
    alert('Movie not found with this Id');
  }
  movies.splice(removeMovieIdx, 1);
  const listRoot = document.getElementById('movie-list') as HTMLUListElement;
  listRoot.removeChild(listRoot.children[removeMovieIdx]);
  closeDeleteMovieModal();
  updateUI();
};

const startDeleteMovieHandler: (id: string) => void = movieId => {
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();
  const cancelDeleteMovieButton = deleteMovieModal.querySelector(
    '.btn--passive'
  ) as HTMLButtonElement;
  let confirmDeleteMovieButton = deleteMovieModal.querySelector(
    '.btn--danger'
  ) as HTMLButtonElement;

  confirmDeleteMovieButton.replaceWith(
    confirmDeleteMovieButton.cloneNode(true)
  ); // By replacing the element will clear its existing eventlisteners
  confirmDeleteMovieButton = deleteMovieModal.querySelector(
    '.btn--danger'
  ) as HTMLButtonElement;

  cancelDeleteMovieButton.removeEventListener('click', closeDeleteMovieModal); // For clearing any existing listeners
  // confirmDeleteMovieButton.removeEventListener('click', deleteMovieHandler.bind(null, movieId))
  // above for confirmDeleteMovieButton won't work because while using bind new fn is created everytime

  cancelDeleteMovieButton.addEventListener('click', closeDeleteMovieModal);
  confirmDeleteMovieButton.addEventListener(
    'click',
    deleteMovieHandler.bind(null, movieId)
  );
};

const renderNewMovieElement: (
  id: string,
  title: string,
  imageUrl: string,
  rating: number
) => void = (movieId, title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
   <div class="movie-element__image">
      <img src="${imageUrl}" alt="${title}" />
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `;
  newMovieElement.addEventListener(
    'click',
    startDeleteMovieHandler.bind(null, movieId)
  );
  const listRoot = document.getElementById('movie-list') as HTMLUListElement;
  listRoot.appendChild(newMovieElement);
};

const addMovieHandler: () => void = () => {
  const movieId = Math.random().toString();
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

  const newMovie = {
    id: movieId,
    title: titleValue,
    imageUrl: imageUrlValue,
    rating: +ratingValue
  };
  movies.push(newMovie);
  closeAddMovieModal();
  toggleBackdrop();
  clearMovieInputs();
  renderNewMovieElement(movieId, titleValue, imageUrlValue, +ratingValue);
  updateUI();
};

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
