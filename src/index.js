import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, delCard, likeCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  closeOnOverlayClick,
} from "./components/modal.js";

//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

//DOM узлы
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");
const buttonOpenEditProfileForm = content.querySelector(".profile__edit-button");
const buttonOpenAddCardForm = content.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_new-card");
const buttonClosePopupAddCard = popupAddCard.querySelector(".popup__close");
const popupEditProfile = document.querySelector(".popup_type_edit");
const buttonClosePopupEditProfile = popupEditProfile.querySelector(".popup__close");
const popupImage = document.querySelector(".popup_type_image");
const buttonClosePopupImage = popupImage.querySelector(".popup__close");
const formEditProfile = document.forms["edit-profile"];
const formNewPlace = document.forms["new-place"];
const nameInput = content.querySelector(".profile__title");
const jobInput = content.querySelector(".profile__description");

//Обработчики событии
buttonOpenEditProfileForm.addEventListener("click", () => {
  formEditProfile.elements.name.value = nameInput.textContent;
  formEditProfile.elements.description.value = jobInput.textContent;
  openModal(popupEditProfile);
});

buttonOpenAddCardForm.addEventListener("click", () => {
  openModal(popupAddCard);
});

buttonClosePopupEditProfile.addEventListener("click", () => {
  closeModal(popupEditProfile);
});

buttonClosePopupAddCard.addEventListener("click", () => {
  closeModal(popupAddCard);
});

buttonClosePopupImage.addEventListener("click", () => {
  closeModal(popupImage);
});

popupEditProfile.addEventListener("click", closeOnOverlayClick);

popupAddCard.addEventListener("click", closeOnOverlayClick);

popupImage.addEventListener("click", closeOnOverlayClick);

formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  nameInput.textContent = formEditProfile.elements.name.value;
  jobInput.textContent = formEditProfile.elements.description.value;
  closeModal(popupEditProfile);
});

formNewPlace.addEventListener("submit", (evt) => {
  const card = {};
  evt.preventDefault();
  card.name = formNewPlace.elements["place-name"].value;
  card.link = formNewPlace.elements.link.value;
  placesList.prepend(
    createCard(cardTemplate, card, delCard, likeCard, openImagePopup)
  );
  closeModal(popupAddCard);
  formNewPlace.reset();
});

//Функция открытия попапа с картинкой
const openImagePopup = (evt) => {
  const img = popupImage.querySelector(".popup__image");
  const caption = popupImage.querySelector(".popup__caption");
  const cardElement = evt.target.closest(".places__item");
  img.src = evt.target.src;
  img.alt = evt.target.alt;
  caption.textContent = cardElement.querySelector(".card__title").textContent;
  openModal(popupImage);
};

//Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i++) {
  placesList.append(
    createCard(cardTemplate, initialCards[i], delCard, likeCard, openImagePopup)
  );
}
