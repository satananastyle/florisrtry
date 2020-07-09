'use strict';

// слайдер на главной странице
(function () {

  var catalogSliderContainer = document.querySelector('.catalog__slider');
  var catalogPagination = document.querySelector('.catalog__pagination');

  var catalogList = document.querySelectorAll('.catalog__item');

  function initSlider () {
    mySwiper = new Swiper(catalogSliderContainer, {
      loop: false,
      direction: 'horizontal',
      setWrapperSize: true,
      // observer: true,

      pagination: {
        el: catalogPagination,
      },

      breakpoints: {
        // when window width is >= 1024px
        1024: {
          slidesPerView: 'auto',
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
  }

  if (catalogSliderContainer) {
    var container = catalogSliderContainer.querySelector('.catalog__container');

    var mySwiper;
    var isActive;

    if (container.clientWidth <= '1350') {
      initSlider();
      catalogPagination.style.display = 'flex';
      isActive = true;
    } else if (catalogList.length >= 3) {
      if (document.body.clientWidth < '1024') {
        initSlider();
        isActive = true;
      }
    }

    window.addEventListener('resize', function () {
      if (container.clientWidth > '1350') {
        if (isActive) {
          mySwiper.destroy(true, true);
          catalogPagination.removeAttribute('style');
          isActive = false;
        }
      }

      if (container.clientWidth <= '1350' && !isActive) {
        initSlider();
        isActive = true;
        catalogPagination.style.display = 'flex';
      }
    });
  }
})();
