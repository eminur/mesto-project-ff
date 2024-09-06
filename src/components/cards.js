export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//Функция создания карточки
export function createCard(cardTemplate, card, delCard, likeCard, popupImg) {
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
  cardImg.addEventListener("click", popupImg);

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
