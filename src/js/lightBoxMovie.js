import ApiService from './api/apiService';
import getRefs from './getRef';
import notify from './error';
import createMarkup from './createMarkup';

const apiService = new ApiService();

const refs = getRefs();

refs.moviesContainer.addEventListener('click', onGalleryContainerClick);
refs.lightBoxCloseRef.addEventListener('click', onBtnCloseLightBox);

function onGalleryContainerClick(evt) {
  evt.preventDefault();

  const isGalleryMovieEl = evt.target.classList.contains('movie-image'); //проверка источника клика
  if (!isGalleryMovieEl) {
    return;
  }
  const openedMovie = evt.target;

  lightBoxOpen(openedMovie);
}

function lightBoxOpen(image) {
  refs.lightBoxContainerRef.classList.add('is-open');
  const movieId = image.dataset.id;
  const dataModalMovie = movieInfoById(movieId).then(data => data);
  window.addEventListener('keydown', onKeyPress);
}

function onBtnCloseLightBox() {
  refs.lightBoxContainerRef.classList.remove('is-open');
  window.removeEventListener('keydown', onKeyPress);
}

function onKeyPress(evt) {
  if (evt.key !== 'Escape') {
    return;
  }
  onBtnCloseLightBox();
  return;
}

function movieInfoById(movieId) {
  return apiService
    .getMovieById(movieId)
    .then(data => data)
    .then(data => createMarkup.lightBoxMarkup(data))
    .catch(error => {
      console.log('error in ID');
      notify.errorMessage(`Ничего не нашли По ИД(`);
    });
}
