import galleryItems from './app.js';

// Sample in the task 7.4
const refs = {
  gallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  lightboxImage: document.querySelector('.lightbox__image'),
  closeModal: document.querySelector('button[data-action="close-lightbox"]'),
  closeModalToClickOutside: document.querySelector('.lightbox__overlay'),
};

galleryItems.forEach(({ preview, original, description, defaultIndex }) => {
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    `<li class="lightbox__image">
      <a cllas="gallery__link" href=${original}>
        <img class="gallery__image" 
        src=${preview} 
        data-source=${original} 
        alt=${description};
        data-index= ${defaultIndex}
        />
      </a> 
    </li> `
  );
});

let curentImgIndex; // індекс відкритої катминки.

refs.gallery.addEventListener('click', onImgClick);

function onImgClick(event) {
  event.preventDefault();
  const galleryImg = event.target.classList.contains('gallery__image');
  if (!galleryImg) {
    return;
  }

  refs.lightboxImage.src = `${event.target.dataset.source}`;
  refs.lightboxImage.alt = `${event.target.alt}`;
  refs.lightboxImage.index = `${event.target.dataset.index}`;

  curentImgIndex = `${event.target.dataset.index}`;

  console.log(refs.lightboxImage.index);

  refs.modal.classList.add('is-open');
}

refs.closeModal.addEventListener('click', closeModal);

function closeModal() {
  refs.modal.classList.remove('is-open');
  refs.lightboxImage.src = '';
  refs.lightboxImage.alt = '';
  refs.lightboxImage.index = '';
}

// Додатково.

// Закривати вікно по escape

window.addEventListener('keydown', escape);

function escape(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

// Закривати вікно по кліку в "молоко"

// refs.closeModalToClickOutside.addEventListener('click', clickOutside);

// function clickOutside(event) {
//   console.log(`event.target:  `, event.target);
//   console.log(`event.currentTarget`, event.currentTarget);
//   if (event.target === event.currentTarget) {
//     closeModal();
//   }
// }

// перелистування клавішами вліво/вправо

// let curentImgIndex = refs.lightboxImage.index;

window.addEventListener('keydown', sliderGallerys);

function sliderGallerys(event) {
  if (event.key === 'ArrowRight') {
    console.log('ArrowRight');
    const curentImgIndexN = Number(curentImgIndex);
    console.log((curentImgIndex = curentImgIndexN + 1));

    refs.lightboxImage.src = `${galleryItems[curentImgIndex].original}`;
    refs.lightboxImage.alt = `${event.target.alt}`;
    refs.lightboxImage.index = `${event.target.dataset.index}`;

    curentImgIndex = `${event.target.dataset.index}`;

    console.log(refs.lightboxImage.index);
    // closeModal();
  }
  if (event.key === 'ArrowLeft') {
    console.log('ArrowLeft');
    console.log((curentImgIndex -= 1));
  }
}
