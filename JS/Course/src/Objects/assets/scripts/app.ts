const addMovieBtn = document.getElementById(
  'add-movie-btn'
) as HTMLButtonElement;
const searchBtn = document.getElementById('search-btn') as HTMLButtonElement;

interface MovieItem {
  id: string;
  info: {
    title: string;
    [key: string]: string;
  };
}

const allMovies: Array<MovieItem> = [];

const renderMovies: () => void = () => {
  const movieList = document.getElementById('movie-list') as HTMLUListElement;
  if (allMovies.length === 0) {
    movieList.classList.remove('visible');
    return;
  } else {
    movieList.classList.add('visible');
  }
  movieList.innerHTML = '';
  allMovies.forEach(movie => {
    const movieEl = document.createElement('li');
    movieEl.textContent = movie.info.title;
    movieList.appendChild(movieEl);
  });
};

const addMovieClickHandler: () => void = () => {
  const title = (document.getElementById('title') as HTMLInputElement).value;
  const extraName = (document.getElementById('extra-name') as HTMLInputElement)
    .value;
  const extraValue = (
    document.getElementById('extra-value') as HTMLInputElement
  ).value;

  if (title === '' || extraName === '' || extraValue === '') {
    return;
  }
  const movie: MovieItem = {
    id: Math.random().toString(),
    info: {
      title: title,
      [extraName]: extraValue
    }
  };
  allMovies.push(movie);
  console.log(movie);
  renderMovies();
};

addMovieBtn.addEventListener('click', addMovieClickHandler);
