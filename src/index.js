import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, delCard, likeCard } from "./components/card.js";
import { showModal, closeModal } from "./components/modal.js";

//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

//DOM узлы
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");
const buttonEdit = content.querySelector(".profile__edit-button");
const buttonAdd = content.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_type_new-card");
const closePopupAdd = popupAdd.querySelector(".popup__close");
const popupEdit = document.querySelector(".popup_type_edit");
const closePopupEdit = popupEdit.querySelector(".popup__close");
const popupImage = document.querySelector(".popup_type_image");
const closePopupImage = popupImage.querySelector(".popup__close");
const formEdit = document.forms["edit-profile"];
const formNewPlace = document.forms["new-place"];
const nameInput = content.querySelector(".profile__title");
const jobInput = content.querySelector(".profile__description");

//Обработчики событии
document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup_is-opened")) {
    closeModal(evt.target);
  }
});

buttonEdit.addEventListener("click", () => {
  formEdit.elements.name.value = nameInput.textContent;
  formEdit.elements.description.value = jobInput.textContent;
  showModal(popupEdit);
});

buttonAdd.addEventListener("click", () => {
  showModal(popupAdd);
});

closePopupEdit.addEventListener("click", () => {
  closeModal(popupEdit);
});

closePopupAdd.addEventListener("click", () => {
  closeModal(popupAdd);
});

closePopupImage.addEventListener("click", () => {
  closeModal(popupImage);
});

formEdit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  nameInput.textContent = formEdit.elements.name.value;
  jobInput.textContent = formEdit.elements.description.value;
  closeModal(popupEdit);
});

formNewPlace.addEventListener("submit", (evt) => {
  const card = {};
  evt.preventDefault();
  card.name = formNewPlace.elements["place-name"].value;
  card.link = formNewPlace.elements.link.value;
  placesList.prepend(
    createCard(cardTemplate, card, delCard, likeCard, openImagePopup)
  );
  closeModal(popupAdd);
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
  showModal(popupImage);
};

//Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i++) {
  placesList.append(
    createCard(cardTemplate, initialCards[i], delCard, likeCard, openImagePopup)
  );
}
