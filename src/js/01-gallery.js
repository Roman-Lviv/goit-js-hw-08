import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');

function createGalleryItem(item) {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img class="gallery__image" src="${item.preview}" data-source="${item.original}" alt="${item.description}" />
      </a>
    </li>
  `;
}

const galleryMarkup = galleryItems.map(createGalleryItem).join('');
galleryContainer.innerHTML = galleryMarkup;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
