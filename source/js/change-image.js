const fullImage = document.querySelector(`.service__main-img img`);

export const changeImage = (i, chapter) => {
  fullImage.src = `img/` + chapter + `/` + chapter + (i + 2) + `-full.jpg`;
}
