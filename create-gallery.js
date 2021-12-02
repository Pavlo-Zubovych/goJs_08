import galleryItems from './app.js';

// Sample in the task 7.4
const refs = {
  gallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  lightboxImage: document.querySelector('.lightbox__image'),
  closeModal: document.querySelector('button[data-action="close-lightbox"]'),
};

galleryItems.forEach(({ preview, original, description }) => {
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    `<li class="lightbox__image">
      <a cllas="gallery__link" href=${original}>
        <img class="gallery__image" 
        src=${preview} 
        data-source=${original} 
        alt=${description}/> 
      </a> 
    </li> `
  );
});

refs.gallery.addEventListener('click', onImgClick);

function onImgClick(event) {
  event.preventDefault();
  const galleryImg = event.target.classList.contains('gallery__image');
  if (!galleryImg) {
    return;
  }

  refs.lightboxImage.src = `${event.target.dataset.source}`;
  console.log(`event.target.dataset.source: ${event.target.dataset.source}`);
  refs.lightboxImage.alt = `${event.target.alt}`;
  console.log(`event.target.alt: ${event.target.alt}`);

  refs.modal.classList.add('is-open');
}

refs.closeModal.addEventListener('click', onClickCloseBtn);

function onClickCloseBtn() {
  refs.modal.classList.remove('is-open');
  refs.lightboxImage.src = '';
  refs.lightboxImage.alt = '';
}

window.addEventListener('keydown', escape);

function escape(event) {
  if (event.key === 'Escape') {
    onClickCloseBtn();
  }
}
