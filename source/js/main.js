import Swiper from 'swiper/bundle';
import {onBtnClick} from './header.js'
// слайдер на главной странице

const catalogSliderContainer = document.querySelector(`.catalog__slider`);
const catalogPagination = document.querySelector(`.catalog__pagination`);

const catalogList = document.querySelectorAll(`.catalog__item`);

const mainSlider = new Swiper(catalogSliderContainer, {
  loop: false,
  direction: `horizontal`,
  setWrapperSize: true,
  // watchOverflow: true,

  pagination: {
    el: catalogPagination,
  },

  breakpoints: {
    // when window width is >= 1024px
    1024: {
      slidesPerView: `auto`,
      spaceBetween: 60,
    },

    768: {
      slidesPerView: 2,
      spaceBetween: 28,
      slidesPerGroup: 2,
    },

    320: {
      slidesPerView: 1,
      spaceBetween: 30,
      slidesPerGroup: 1,
    },
  }
});

if (catalogSliderContainer) {
  const container = catalogSliderContainer.querySelector(`.catalog__container`);

  let isActive;

  if (container.clientWidth <= `1350`) {
    mainSlider.init();
    catalogPagination.style.display = `flex`;
    isActive = true;
  } else if (catalogList.length >= 3) {
    if (document.body.clientWidth < `1024`) {
      mainSlider.init();
      isActive = true;
    }
  }

  window.addEventListener(`resize`, function () {
    if (container.clientWidth > '1350') {
      if (isActive) {
        mainSlider.destroy(true, true);
        catalogPagination.removeAttribute(`style`);
        isActive = false;
      }
    }

    if (container.clientWidth <= `1350` && !isActive) {

      if(!mainSlider) {
        mainSlider.init();
      }

      isActive = true;
      catalogPagination.style.display = `flex`;
    }
  });
}

onBtnClick();
