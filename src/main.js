import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchPhotosByQuery } from './js/pixabay-api';
import { createGalleryTemplate } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/loader.css';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loaderEl = document.querySelector('.js-loader');
const loadMoreBtnEl = document.querySelector('.js-load-more-btn');

let page = 1;
let searchedQuery = '';

const lightbox = new SimpleLightbox('.js-gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

loadMoreBtnEl.classList.add('is-hidden');

const loadImages = () => {
  loaderEl.style.display = 'block';

  fetchPhotosByQuery(searchedQuery, page)
    .then(data => {
      if (!data.hits || data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message: 'Sorry, there are no images matching your search query. Please try again!',
        });
        loadMoreBtnEl.classList.add('is-hidden');
        return;
      }

      const galleryTemplate = data.hits.map(el => createGalleryTemplate(el)).join('');
      galleryEl.insertAdjacentHTML('beforeend', galleryTemplate);

      if (page * 15 >= data.totalHits) {
        loadMoreBtnEl.classList.add('is-hidden');
        iziToast.info({
          title: 'Info',
          message: 'You have reached the end of search results.',
        });
      } else {
        loadMoreBtnEl.classList.remove('is-hidden');
      }

      lightbox.refresh();
      iziToast.success({
        title: 'Success',
        message: `Found ${data.totalHits || 0} images.`,
      });

      const { height: cardHeight } = galleryEl.firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    })
    .catch(err => {
      console.error('Error fetching photos:', err);
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later!',
      });
    })
    .finally(() => {
      loaderEl.style.display = 'none';
    });
};

const onSearchFormSubmit = event => {
  event.preventDefault();
  galleryEl.innerHTML = '';
  page = 1;

  searchedQuery = event.currentTarget.elements.user_query.value.trim();
  if (searchedQuery === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please fill in the search form!',
    });
    return;
  }

  loadImages();
};

const onLoadMoreBtnClick = () => {
  page += 1;
  loadImages();
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
