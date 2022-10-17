import { createMarkup } from './markup';
const axios = require('axios').default;

const galleryRef = document.querySelector('.gallery');

export default class ImageApiServer {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchPhoto() {
    const config = {
      url: 'https://pixabay.com/api/',
      method: 'get',
      baseURL: 'https://pixabay.com/api/',
      params: {
        key: '30638749-d35f41ebb6e3ac5e796b8db8e',
        q: `${this.searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 40,
        page: this.page,

        pageIncrement() {
          this.page += 1;
        },

        pageReset() {
          this.page = 1;
        },
      },
    };

    axios(config)
      .then(function (response) {
        const data = response.data.hits;
        data.forEach(
          ({
            webformatURL,
            tags,
            likes,
            views,
            comments,
            downloads,
            largeImageURL,
          }) => {
            const markup = createMarkup({
              webformatURL,
              tags,
              likes,
              views,
              comments,
              downloads,
              largeImageURL,
            });
            galleryRef.insertAdjacentHTML('beforeend', markup);
          }
        );
      })
      .then(data => {
        this.page += 1;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
