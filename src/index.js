import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { createMarkup } from './js/markup';
import ImageApiServer from './js/axios';
// const axios = require('axios').default;
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a', {
  captionType: 'alt',
  captionsData: 'alt',
  captionDelay: 250,
  showCounter: false,
  maxZoom: 2,
  scrollZoomFactor: 0.1,
});

const imageApiServer = new ImageApiServer();

const galleryRef = document.querySelector('.gallery');
const inputFormRef = document.querySelector('#search-form');
const loadBtnRef = document.querySelector('.load-more');

inputFormRef.addEventListener('submit', submitHandler);
loadBtnRef.addEventListener('click', loadMoreHandler);

function submitHandler(e) {
  e.preventDefault();
  imageApiServer.query = e.currentTarget.elements.searchQuery.value;

  galleryRef.innerHTML = '';
  imageApiServer.resetPage();
  imageApiServer.fetchPhoto();

  gallery.on('show.simplelightbox', function () {
    // do something…
  });
}

function loadMoreHandler() {
  imageApiServer.fetchPhoto();
}
