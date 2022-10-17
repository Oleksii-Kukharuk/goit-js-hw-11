import { createMarkup } from './markup';
const axios = require('axios').default;

const galleryRef = document.querySelector('.gallery');

export default class ImageApiServer {
  constructor() {}

  fetchPhoto(q) {
    const config = {
      url: 'https://pixabay.com/api',
      method: 'get',
      baseURL: 'https://pixabay.com/api',
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

    return axios(config)
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
}
