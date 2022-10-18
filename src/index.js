import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkup } from './js/markup';
import ImageApiServer from './js/axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const imageApiServer = new ImageApiServer();

const galleryRef = document.querySelector('.gallery');
const inputFormRef = document.querySelector('#search-form');
const loadBtnRef = document.querySelector('.load-more');

inputFormRef.addEventListener('submit', submitHandler);
loadBtnRef.addEventListener('click', loadMoreHandler);

let lightbox = new SimpleLightbox('.gallery a', {
  captionType: 'alt',
  captionsData: 'alt',
  captionDelay: 250,
  showCounter: false,
  maxZoom: 2,
  scrollZoomFactor: 0.1,
});

function submitHandler(e) {
  loadBtnRef.classList.add('visually-hidden');
  e.preventDefault();
  imageApiServer.query = e.currentTarget.elements.searchQuery.value;
  galleryRef.innerHTML = '';
  imageApiServer.resetPage();
  imageApiServer.fetchPhoto().then(data => {
    data.map(data => {
      galleryRef.insertAdjacentHTML('beforeend', createMarkup(data));
      lightbox.refresh();
    });
    Notify.success('look what I found for you');
  });

  // async function isShownBtnLoadMore() {
  //   const totalPhotos = await imageApiServer.fetchPhoto('hits');
  //   return totalPhotos;
  // }
  // isShownBtnLoadMore();
  // if (imageApiServer.totall > 500) {
  loadBtnRef.classList.remove('visually-hidden');
  //   Notify.info(`i found only ${imageApiServer.total} photos`);
  // }
}

function loadMoreHandler() {
  imageApiServer.fetchPhoto().then(data => {
    data.map(data => {
      galleryRef.insertAdjacentHTML('beforeend', createMarkup(data));
      lightbox.refresh();
    });
    Notify.success('here you go');
  });
}
