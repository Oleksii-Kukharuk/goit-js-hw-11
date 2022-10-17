import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { createMarkup } from './js/markup';
import ImageApiServer from './js/axios';
const axios = require('axios').default;

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
}

function loadMoreHandler() {
  imageApiServer.fetchPhoto();
}
