// слайдеры на страницах услуг


import Swiper from 'swiper/bundle';

const sliderContainer = document.querySelector(`.service__gallery`);
const btnPrev = document.querySelector(`.button-navigation--prev`);
const btnNext = document.querySelector(`.button-navigation--next`);

// const imageList = document.querySelectorAll(`.service__gallery-item`);
export const gallerySlider = new Swiper(sliderContainer, {
  init: false,
  loop: false,
  direction: `horizontal`,
  setWrapperSize: true,
  centeredSlidesBounds: true,
  // width: 1180,

  navigation: {
    nextEl: btnNext,
    prevEl: btnPrev,
  },

  breakpoints: {
    // when window width is >= 1024px
    1024: {
      slidesPerView: `auto`,
      spaceBetween: 20,
    },

    768: {
      slidesPerView: 4,
      spaceBetween: 24,
    },

    320: {
      slidesPerView: `auto`,
      spaceBetween: 15,
    },
  }
});
