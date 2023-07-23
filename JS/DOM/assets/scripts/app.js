const addMovieModal = document.getElementById('add-modal');
const deleteMovieModal = document.getElementById('delete-modal');
const backdrop = document.getElementById('backdrop');
const startAddMovieButton = document.getElementById('add-btn');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = document.querySelectorAll('input');
const defaultMoviesTab = document.getElementById('entry-text');
const rootList = document.getElementById('movie-list');
const cancelDeleteMovieButton = deleteMovieModal.querySelector('.btn--passive');
const confirmDeleteMovieButton = cancelDeleteMovieButton.nextElementSibling;

const movies = [];

const addMovieHandler = () => {
  const uniqueId = Math.random().toString();
  const title = userInputs[0].value;
  const imageUrl = userInputs[1].value;
  const rating = userInputs[2].value;
  if (
    title.trim() === '' ||
    imageUrl.trim() === '' ||
    +rating < 1 ||
    +rating > 5
  ) {
    alert('Please enter a valid inputs.');
  }

  const addedMovie = {
    movieId: uniqueId,
    title: title,
    imageUrl: imageUrl,
    rating: rating,
  };

  movies.push(addedMovie);
  clearInputs();
  closeMovieModal();
  toggleBackdrop();
  renderMovieElement(addedMovie.movieId, title, imageUrl, rating);
  updateUI();
};

const clearInputs = () => {
  for (let usrInput of userInputs) {
    usrInput.value = '';
  }
};

const updateUI = () => {
  if (movies.length === 0) {
    defaultMoviesTab.style.display = 'block';
  } else {
    defaultMoviesTab.style.display = 'none';
  }
};

const deleteMovie = id => {
  let movieIdx = 0;
  for (let movie of movies) {
    if (id === movie.movieId) {
      break;
    }
    movieIdx++;
  }
  movies.splice(movieIdx, 1);
  rootList.children[movieIdx].remove();
  // rootList.removeChild(rootList.children[movieIdx]);
  deleteMovieModal.classList.remove('visible');
  toggleBackdrop();
};

const renderMovieElement = (movieId, title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>
    `;
  newMovieElement.addEventListener(
    'click',
    deleteMovieHandler.bind(null, movieId)
  );
  rootList.append(newMovieElement);
};

const closeMovieDeletionModal = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible');
};

const deleteMovieHandler = id => {
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();
  cancelDeleteMovieButton.addEventListener('click', cancelDeleteMovieHandler);
  confirmDeleteMovieButton.addEventListener(
    'click',
    deleteMovie.bind(null, id)
  );
  // deleteMovie(id);
};

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible');
};

const showMovieModal = () => {
  addMovieModal.classList.add('visible');
  toggleBackdrop();
};

const clearMovieInput = () => {
  for (const usrInput of userInputs) {
    usrInput.value = '';
  }
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  toggleBackdrop();
  clearMovieInput();
};

const backdropClickHandler = () => {
  closeMovieModal();
  closeMovieDeletionModal();
};

const cancelDeleteMovieHandler = () => {
  closeMovieDeletionModal();
};

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
