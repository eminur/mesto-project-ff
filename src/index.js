import "./pages/index.css";
import {
  initialCards,
  createCard,
  delCard,
  likeCard,
} from "./components/cards.js";
import { togglePopupIsOpened, popupImg } from "./components/modal.js";

//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

//DOM узлы
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEdit = document.querySelector(".popup_type_edit");
const formEditProfile = document.forms["edit-profile"];
const formNewPlace = document.forms["new-place"];
const nameInput = content.querySelector(".profile__title");
const jobInput = content.querySelector(".profile__description");

//Обработчики событии
document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup__close")) {
    togglePopupIsOpened(evt.target.closest(".popup"));
  } else if (evt.target.classList.contains("profile__edit-button")) {
    formEditProfile.elements.name.value = nameInput.textContent;
    formEditProfile.elements.description.value = jobInput.textContent;
    togglePopupIsOpened(popupEdit);
  } else if (evt.target.classList.contains("profile__add-button")) {
    togglePopupIsOpened(popupNewCard);
  } else if (evt.target.classList.contains("popup_is-opened")) {
    togglePopupIsOpened(evt.target);
  }
});

formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  nameInput.textContent = formEditProfile.elements.name.value;
  jobInput.textContent = formEditProfile.elements.description.value;
  togglePopupIsOpened(popupEdit);
});

formNewPlace.addEventListener("submit", (evt) => {
  const card = {};
  evt.preventDefault();
  card.name = formNewPlace.elements["place-name"].value;
  card.link = formNewPlace.elements.link.value;
  placesList.prepend(
    createCard(cardTemplate, card, delCard, likeCard, popupImg)
  );
  togglePopupIsOpened(popupNewCard);
  formNewPlace.reset();
});

//Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i++) {
  placesList.append(
    createCard(cardTemplate, initialCards[i], delCard, likeCard, popupImg)
  );
}
