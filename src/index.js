import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { createMarkup } from './js/markup';
import ImageApiServer from './js/axios';
const axios = require('axios').default;

const imageApiServer = new ImageApiServer();

const galleryRef = document.querySelector('.gallery');
const inputFormRef = document.querySelector('#search-form');
const loadBtnRef = document.querySelector('.load-more');

inputFormRef.addEventListener('submit', submitHandler);

function submitHandler(e) {
  e.preventDefault();
  serchQuery = e.currentTarget.elements.searchQuery.value;

  galleryRef.innerHTML = '';
  imageApiServer.fetchPhoto(serchQuery);
}

console.log(inputFormRef);
// function loadMoreHandler(e) {
//   config.pageIncrement();
// }
// loadBtnRef.addEventListener('click', loadMoreHandler);
