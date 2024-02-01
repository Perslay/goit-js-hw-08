import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const list = document.querySelector('.gallery');

const listItems = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<li><a class="gallery__item" href=${original}>
      <img class="gallery__image" src=${preview} alt="${description}" />
      </a></li>`
  )
  .join('');

list.insertAdjacentHTML('afterbegin', listItems);

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

console.log(galleryItems);
