import { onBtnClick } from './header.js'
import { initMainSlider } from './main-slider.js'
import { gallerySlider } from './swiper.js'
import { changeImage } from './change-image.js'
import { IMask } from './imask'

const catalogSliderContainer = document.querySelector(`.catalog__slider`);
if (catalogSliderContainer) {
  initMainSlider();
}

const sliderContainer = document.querySelector(`.service__gallery`);
if (sliderContainer) {
  gallerySlider.init();

  const chapter = document.querySelector(`.service`).getAttribute(`data-chapter`);
  const imagesList = document.querySelectorAll(`.service__gallery-item`);

  imagesList.forEach((element, index) => {
    element.addEventListener('click', () => {
      changeImage(index, chapter);
    })
  })
}


onBtnClick();

// валидация

var MAX_LENGTH = 16;

function getPhoneError(phone) {
  if (phone.length < MAX_LENGTH) {
    return 'Укажите ваш телефон';
  }

  if (phone.substring(0, 2) !== '+7') {
    return 'Укажите ваш телефон';
  }
  return '';
}

function getNameError(name) {
  if (name === '') {
    return 'Укажите ваше имя';
  }
  return '';
}

function getResultValidation(evt, currentForm) {
  evt.preventDefault();
  evt.stopPropagation();

  var currentInput = currentForm.querySelector('input[type="tel"]');
  var currentName = currentForm.querySelector('input[type="text"]');

  var errorPhone = getPhoneError(currentInput.value);

  if (currentName) {
    var errorName = getNameError(currentName.value);
    if (errorName !== '') {
      currentName.style.border = '1px solid red';
    } else {
      currentName.removeAttribute('style');
    }
  }

  if (errorPhone) {
    currentInput.style.border = '1px solid red';
  } else {
    currentInput.removeAttribute('style');
  }

  if (errorPhone || errorName) {
    return 'Не все поля заполненны корректно';
  }

  localStorage.setItem('user', currentName.value);
  localStorage.setItem('phone', currentInput.value);

  currentForm.reset();
  return '';
}

// модальное окно
var ESC_CODE = 27;

var body = document.querySelector('body');

var callMeButton = document.querySelector('#order');
var modalCallMe = document.querySelector('.modal');
var modalName = modalCallMe.querySelector('input[name="user"]');
var modalPhone = modalCallMe.querySelector('input[type="tel"]');
var closeCallMe = modalCallMe.querySelector('button[type="button"]');
var orderButton = modalCallMe.querySelector('button[type="submit"]');
var form = modalCallMe.querySelector('form');
var inputs = document.querySelectorAll('input');



if (callMeButton) {
  callMeButton.addEventListener('click', onCallMeButton);
}

function openModal() {
  modalCallMe.classList.remove('modal--hidden');

  body.classList.add("modal-opened");

  modalCallMe.addEventListener('click', onOverlay);
  document.addEventListener('keydown', onModalEscPress);

  if (localStorage.getItem('user') && localStorage.getItem('phone') && localStorage.getItem('letter')) {
    modalName.value = localStorage.getItem('user');
    modalPhone.value = localStorage.getItem('phone');

    orderButton.focus();
  } else {
    modalName.focus();
  }
}

function onOverlay(evt) {
  if (evt.target === modalCallMe) {
    closeModal();
  }
}

function closeModal() {
  form.reset();
  clearForm();
  body.classList.remove("modal-opened");

  if (!modalCallMe.classList.contains('modal--hidden')) {
    modalCallMe.classList.add('modal--hidden');
    closeCallMe.removeEventListener('click', onCloseButton);
    orderButton.removeEventListener('click', onOrderButton);
  }

  closeCallMe.removeEventListener('click', onCloseButton);
  orderButton.removeEventListener('click', onOrderButton);

  modalCallMe.classList.add('modal--hidden');
  body.removeAttribute('style');

  modalCallMe.removeEventListener('click', onOverlay);
  document.removeEventListener('keydown', onModalEscPress);
}

function onCallMeButton(evt) {
  evt.preventDefault();
  evt.stopPropagation();

  modalCallMe.classList.remove('modal--hidden');
  closeCallMe.addEventListener('click', onCloseButton);
  orderButton.addEventListener('click', onOrderButton);

  openModal();
}

function onCloseButton(evt) {
  evt.preventDefault();
  evt.stopPropagation();

  closeModal();
}

function onOrderButton(evt) {
  evt.preventDefault();
  evt.stopPropagation();

  if (getResultValidation(evt, form) !== '') {
    return;
  }

  closeModal();
}

function onModalEscPress(evt) {
  if (evt.keyCode === ESC_CODE) {
    evt.preventDefault();
    closeModal();
  }
}

function clearForm() {
  Array.prototype.forEach.call(inputs, function (element) {
    element.removeAttribute('style');
  });
}

Array.prototype.forEach.call(inputs, function (element) {
  element.oninput = function () {
    element.removeAttribute('style');
  };
});

const mask = IMask(document.querySelector('.modal input[type="tel"]'), { mask: '+{7}(000)000-00-00' });


//плавный скролл
// var scrollBtn = document.querySelector('.homescreen__scroll');
// var advisoryBtn = document.querySelector('.homescreen__button');
// var infoNode = document.querySelector('.general');
// var advisoryNode = document.querySelector('.feedback');
// var move = new MoveTo();
// if (scrollBtn && infoNode) {
//   scrollBtn.addEventListener('click', function (evt) {
//     evt.preventDefault();
//     move.move(infoNode);
//   });
// }
// if (advisoryBtn && advisoryNode) {
//   advisoryBtn.addEventListener('click', function (evt) {
//     evt.preventDefault();
//     move.move(advisoryNode);
//   });
// }

