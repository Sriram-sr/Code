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
  getFormattedTitle: () => string;
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
    let { info, getFormattedTitle } = movie;
    getFormattedTitle = getFormattedTitle.bind(movie);
    if ('title' in info) {
      console.log(info.title);
    }
    let text = getFormattedTitle() + ' -';
    // let text = getFormattedTitle.call(movie) + ' -';
    for (const key in info) {
      if (key !== 'title') {
        text += `
         ${key}: ${info[key]}
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
    },
    getFormattedTitle: function () {
      console.log(`This is ${this}`);
      return this.info.title.toUpperCase();
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
