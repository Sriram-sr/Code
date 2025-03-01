const addMovieBtn = document.getElementById(
  'add-movie-btn'
) as HTMLButtonElement;
const searchBtn = document.getElementById('search-btn') as HTMLButtonElement;

const allMovies = [];

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
  const movie = {
    id: Math.random(),
    info: {
      title: title,
      [extraName]: extraValue
    }
  };
  allMovies.push(movie);
  console.log(movie);
};

addMovieBtn.addEventListener('click', addMovieClickHandler);
