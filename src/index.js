import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkup } from './js/markup';
const axios = require('axios').default;

const galleryRef = document.querySelector('.gallery');
const inputFormRef = document.querySelector('#search-form');
const loadBtnRef = document.querySelector('.load-more');

let serchQuery = '';

function submitHandler(e) {
  e.preventDefault();
  serchQuery = e.currentTarget.elements.searchQuery.value;

  galleryRef.innerHTML = '';

  const config = {
    url: 'https://pixabay.com/api',
    method: 'get',
    baseURL: 'https://pixabay.com/api',
    proxy: {
      protocol: 'https',
      host: '127.0.0.1',
      port: 9000,
      auth: {
        username: 'mikeymike',
        password: 'rapunz3l',
      },
    },
    params: {
      key: '30638749-d35f41ebb6e3ac5e796b8db8e',
      q: `${serchQuery}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 40,
      page: 1,

      pageIncrement() {
        this.params.page += 1;
      },

      pageReset() {
        this.params.page = 1;
      },
    },
  };

  axios(config)
    .then(function (response) {
      const data = response.data.hits;
      data.forEach(
        ({ webformatURL, tags, likes, views, comments, downloads }) => {
          const markup = createMarkup({
            webformatURL,
            tags,
            likes,
            views,
            comments,
            downloads,
          });
          galleryRef.insertAdjacentHTML('beforeend', markup);
        }
      );
    })
    .catch(function (error) {
      console.log(error);
    });
}

inputFormRef.addEventListener('submit', submitHandler);
console.log(inputFormRef);
