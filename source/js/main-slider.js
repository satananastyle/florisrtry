// слайдер на главной странице

import Swiper from 'swiper/bundle';

const catalogSliderContainer = document.querySelector(`.catalog__slider`);
const catalogPagination = document.querySelector(`.catalog__pagination`);

const catalogList = document.querySelectorAll(`.catalog__item`);
const mainSlider = new Swiper(catalogSliderContainer, {
  init: false,
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
}
);


export const initMainSlider = () => {
  const activeSlider = catalogSliderContainer.querySelector(`.swiper-container-initialized`);
  let isActive;

  if (document.body.clientWidth <= `1380`) {
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
    if (document.body.clientWidth <= `1380` && !isActive) {

      if (!activeSlider) {
        mainSlider.init();
      }

      isActive = true;
      catalogPagination.style.display = `flex`;
    }

    if (document.body.clientWidth > '1380') {
      if (isActive) {
        mainSlider.destroy(false, true);
        catalogPagination.removeAttribute(`style`);
        isActive = false;
      }
    }
  });
};
