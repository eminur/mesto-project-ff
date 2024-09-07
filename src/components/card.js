//Функция создания карточки
export function createCard(
  cardTemplate,
  card,
  delCard,
  likeCard,
  openImagePopup
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const cardDelButton = cardElement.querySelector(".card__delete-button");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardImg.src = card.link;
  cardImg.alt = "Изображение местности " + card.name;
  cardTitle.textContent = card.name;

  cardDelButton.addEventListener("click", delCard);
  cardLikeButton.addEventListener("click", likeCard);
  cardImg.addEventListener("click", openImagePopup);

  return cardElement;
}

// Функция удаления карточки
export const delCard = (evt) => {
  const placeItem = evt.target.closest(".places__item");
  placeItem.remove();
};

//Функция установки лайка
export const likeCard = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};
