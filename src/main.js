import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  hideLoadMoreButton,
  loadMoreBtn,
  showLoader,
  showLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');

let page = 1;
let query;

form.addEventListener('submit', onFormSubmit);

loadMoreBtn.addEventListener('click', onLoadMore);

async function onFormSubmit(event) {
  event.preventDefault();
  clearGallery();

  query = form.elements['search-text'].value.trim();

  if (query === '') {
    iziToast.error({
      class: 'my-toast',
      title: '',
      timeout: 10000,
      message: 'Будь ласка, введіть пошуковий запит!',
      theme: 'dark',
      position: 'topRight',
      backgroundColor: 'red',
    });

    return;
  }
  page = 1;
  showLoader();

  try {
    const { hits, totalHits } = await getImagesByQuery(query, page);

    if (hits.length === 0) {
      iziToast.error({
        class: 'my-toast',
        title: '',
        timeout: 10000,
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        theme: 'dark',
        position: 'topRight',
        backgroundColor: 'red',
      });
      return;
    }
    createGallery(hits);

    if (totalHits > page * 15) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    console.log(error);
    hideLoadMoreButton();
    iziToast.error({
      class: 'my-toast',
      title: '',
      timeout: 10000,
      message: 'An error occurred during the request!',
      theme: 'dark',
      position: 'topRight',
      backgroundColor: 'red',
    });
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  page++;
  hideLoadMoreButton();

  showLoader();
  try {
    const { hits, totalHits } = await getImagesByQuery(query, page);
    showLoadMoreButton();
    createGallery(hits);

    const totalLoadedImages = document.querySelectorAll('.gallery-item').length;
    console.log(totalLoadedImages);

    if (totalLoadedImages >= totalHits) {
      hideLoadMoreButton();
    }

    smoothScroll();
  } catch (error) {
    console.log(error);
    hideLoadMoreButton();
    iziToast.info({
      class: 'my-toast',
      title: '',
      timeout: 10000,
      message: 'We are sorry, but you have reached the end of search results.',
      theme: 'dark',
      position: 'topRight',
      backgroundColor: '#08b84b',
    });
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const card = document.querySelector('.gallery-item');
  const cardHeight = card.getBoundingClientRect().height;
  if (card) {
    window.scrollBy({
      left: 0,
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
