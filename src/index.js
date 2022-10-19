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

async function submitHandler(e) {
  loadBtnRef.classList.add('visually-hidden');
  e.preventDefault();
  imageApiServer.query = e.currentTarget.elements.searchQuery.value;
  galleryRef.innerHTML = '';
  imageApiServer.resetPage();
  await imageApiServer.fetchPhoto().then(({ totalHits, hits }) => {
    hits.map(data => {
      galleryRef.insertAdjacentHTML('beforeend', createMarkup(data));
      lightbox.refresh();
    });

    console.log(totalHits);
    imageApiServer.calculateTotalPages(totalHits);
    console.log(imageApiServer);
    if (imageApiServer.isLoadBtnShown) {
      loadBtnRef.classList.remove('visually-hidden');
      Notify.info(`i found only ${imageApiServer.totalHits} photos`);
    }

    // Notify.success('look what I found for you');
  });
}

function loadMoreHandler() {
  imageApiServer.pageIncrement();
  imageApiServer.fetchPhoto().then(({ hits, totalHits }) => {
    hits.map(data => {
      galleryRef.insertAdjacentHTML('beforeend', createMarkup(data));
      lightbox.refresh();
    });
    console.log(imageApiServer.page);

    // imageApiServer.calculateTotalPages(totalHits);
    if (imageApiServer.doubleCheck) {
      loadBtnRef.classList.add('visually-hidden');
    }

    Notify.success('here you go');
  });
}
