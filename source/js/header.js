const headerElement = document.querySelector(`.page-header`);
const closeBtn = headerElement.querySelector(`button`);
const body =document.querySelector(`body`);

const openMenu = () => {
  headerElement.classList.add(`page-header--open`);
  // body.style.position = 'fixed';
  body.style.overflow = 'hidden';
  closeBtn.addEventListener(`click`, closeMenu);
};

const closeMenu = () => {
  headerElement.classList.remove(`page-header--open`);
  body.removeAttribute(`style`);
  closeBtn.removeEventListener(`click`, closeMenu);
};

export const onBtnClick = () => {
  closeBtn.addEventListener('click', openMenu);
};

