const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.body.firstElementChild;
const cancelAddMovieButton = addMovieModal?.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton?.nextElementSibling;
const inputs = addMovieModal?.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const listRoot = document.getElementById('movie-list');
const useFullImageUrls = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPqKmgwX1P_1Ps9LNEVKGJHBXBJ-5RSStg6A&s',
  'https://www.google.com/imgres?q=js&imgurl=https%3A%2F%2Fbairesdev.mo.cloudinary.net%2Fblog%2F2023%2F08%2FWhat-Is-JavaScript-Used-For.jpg&imgrefurl=https%3A%2F%2Fwww.bairesdev.com%2Fblog%2Fwhat-is-javascript-used-for%2F&docid=Q6lqfXbpXrAAjM&tbnid=zCICYPJA6DvVOM&vet=12ahUKEwiFnqT_r-6FAxUkg2MGHXiLDLwQM3oECGQQAA..i&w=1200&h=675&hcb=2&ved=2ahUKEwiFnqT_r-6FAxUkg2MGHXiLDLwQM3oECGQQAA'
];

interface Movie {
  id: string;
  title: string;
  imageUrl: string;
  ratings: number;
}
const movies: Movie[] = [];

const toggleBackdrop: () => void = () => {
  backdrop?.classList.toggle('visible');
};

const toggleMovieModal: () => void = () => {
  addMovieModal?.classList.toggle('visible');
  toggleBackdrop();
  clearMovieInputs();
};

const backdropClickHandler: () => void = () => {
  toggleMovieModal();
};

const clearMovieInputs = () => {
  for (const userInput of inputs!) {
    userInput.value = '';
  }
};

const cancelAddMovieHandler = () => {
  toggleMovieModal();
};

const addMovieHandler = () => {
  const title = inputs![0].value;
  const imageUrl = inputs![1].value;
  const ratings = inputs![2].value;
  const movieId = Math.random().toString();

  if (
    title.trim() === '' ||
    imageUrl.trim() === '' ||
    +ratings < 1 ||
    +ratings > 5
  ) {
    alert('Enter valid inputs(Ratings should be within 1 to 5)');
    return;
  }
  movies.push({
    id: movieId,
    title: title,
    imageUrl: imageUrl,
    ratings: +ratings
  });
  toggleMovieModal();
  updateUI();
  renderNewMovieElement(movieId, title, imageUrl, +ratings);
  clearMovieInputs();
};

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection!.style.display = 'block';
  } else {
    entryTextSection!.style.display = 'none';
  }
};

const deleteMovieHandler = (movieId: string) => {
  let movieIdx = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIdx++;
  }
  movies.splice(movieIdx, 1);
  console.log(movies);
  listRoot?.removeChild(listRoot.children[movieIdx]);
};

const renderNewMovieElement = (
  movieId: string,
  title: string,
  imageUrl: string,
  ratings: number
) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${ratings}/5 stars</p>
    </div>
  `;
  newMovieElement.addEventListener(
    'click',
    deleteMovieHandler.bind(null, movieId)
  );
  listRoot?.appendChild(newMovieElement);
};

startAddMovieButton?.addEventListener('click', toggleMovieModal);
backdrop?.addEventListener('click', backdropClickHandler);
cancelAddMovieButton?.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton?.addEventListener('click', addMovieHandler);
