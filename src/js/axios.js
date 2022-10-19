import { createMarkup } from './markup';
const axios = require('axios').default;

const galleryRef = document.querySelector('.gallery');

export default class ImageApiServer {
  #totalPages = 0;
  constructor() {
    this.searchQuery = '';
    this.page = 0;
    this.total = 0;
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
      },
    };

    return axios(config)
      .then(response => response)
      .then(data => {
        this.total = data.data.total;
        return data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  resetPage() {
    this.page = 1;
  }
  pageIncrement() {
    this.page += 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get totall() {
    return this.total;
  }

  calculateTotalPages(totalHits) {
    this.#totalPages = Math.ceil(totalHits / 40);
  }

  get isLoadBtnShown() {
    return this.page < this.#totalPages;
  }

  get doubleCheck() {
    return this.page >= this.#totalPages;
  }
}
// const data = response.data.hits;
