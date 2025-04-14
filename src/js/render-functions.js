import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
export const loadMoreBtn = document.querySelector('.js-load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
        <a class="gallery-link" href="${webformatURL}">
        <img class="item-image"
        src="${largeImageURL}"
        // alt="${tags}" width = "360" height = "200"
        />
        </a>
        <div class="gallery-card">
        <p><b>Likes:</b> ${likes}</p>
        <p><b>Views:</b> ${views}</p>
        <p><b>Comment:</b> ${comments}</p>
        <p><b>Download:</b> ${downloads}</p>
        </div>
                </li> `
    )
    .join('');
  galleryList.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export function clearGallery() {
  galleryList.innerHTML = '';
}
export function showLoader() {
  loader.classList.remove('hidden');
}
export function hideLoader() {
  loader.classList.add('hidden');
}
export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('load-more-hidden');
}
export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('load-more-hidden');
}
