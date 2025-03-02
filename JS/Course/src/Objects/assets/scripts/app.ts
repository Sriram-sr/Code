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

const renderMovies: (filter?: string) => void = (filter = '') => {
  const movieList = document.getElementById('movie-list') as HTMLUListElement;
  if (allMovies.length === 0) {
    movieList.classList.remove('visible');
    return;
  } else {
    movieList.classList.add('visible');
  }
  movieList.innerHTML = '';
  const filteredMovies = !filter
    ? allMovies
    : allMovies.filter(movie =>
        movie.info.title.toLowerCase().includes(filter)
      );
  filteredMovies.forEach(movie => {
    const movieEl = document.createElement('li');
    let text = movie.info.title + ' -';
    for (const key in movie.info) {
      if (key !== 'title') {
        text += `
         ${key}: ${movie.info[key]}
        `;
      }
    }
    movieEl.textContent = text;
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
      title,
      [extraName]: extraValue
    }
  };
  allMovies.push(movie);
  renderMovies();
};

const searchMovieHandler: () => void = () => {
  const searchString = document.getElementById(
    'filter-title'
  ) as HTMLInputElement;
  renderMovies(searchString.value.toLowerCase());
};

addMovieBtn.addEventListener('click', addMovieClickHandler);
searchBtn.addEventListener('click', searchMovieHandler);
