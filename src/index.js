import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, delCard, likeCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  closeOnOverlayClick,
} from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getInitialCards,
  getUserProfile,
  createNewCard,
  updateProfile,
  updateAvatar,
} from "./components/api.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const textSaving = "Сохранение...";
const textSave = "Сохранить";

//Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

//DOM узлы
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");
const buttonOpenEditProfileForm = content.querySelector(
  ".profile__edit-button"
);
const buttonOpenAddCardForm = content.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_new-card");
const buttonClosePopupAddCard = popupAddCard.querySelector(".popup__close");
const popupEditProfile = document.querySelector(".popup_type_edit");
const buttonClosePopupEditProfile =
  popupEditProfile.querySelector(".popup__close");
const popupImage = document.querySelector(".popup_type_image");
const buttonClosePopupImage = popupImage.querySelector(".popup__close");
const popupAvatar = document.querySelector(".popup_type_avatar");
const buttonClosePopupAvatar = popupAvatar.querySelector(".popup__close");
const formEditProfile = document.forms["edit-profile"];
const formEditAvatar = document.forms["edit-avatar"];
const formNewPlace = document.forms["new-place"];
const nameInput = content.querySelector(".profile__title");
const jobInput = content.querySelector(".profile__description");
const profileImage = content.querySelector(".profile__image");
const avatarEditIcon = content.querySelector(".profile__avatar-edit-icon");

let myId = "";

//Обработчики событии
buttonOpenEditProfileForm.addEventListener("click", () => {
  formEditProfile.elements.name.value = nameInput.textContent;
  formEditProfile.elements.description.value = jobInput.textContent;
  clearValidation(formEditProfile, validationConfig);
  openModal(popupEditProfile);
});

buttonOpenAddCardForm.addEventListener("click", () => {
  formNewPlace.elements["place-name"].value = "";
  formNewPlace.elements.link.value = "";
  clearValidation(formNewPlace, validationConfig);
  openModal(popupAddCard);
});

avatarEditIcon.addEventListener("click", () => {
  formEditAvatar.elements["avatar-link"].value = "";
  clearValidation(formEditAvatar, validationConfig);
  openModal(popupAvatar);
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

buttonClosePopupAvatar.addEventListener("click", () => {
  closeModal(popupAvatar);
});

popupEditProfile.addEventListener("click", closeOnOverlayClick);

popupAddCard.addEventListener("click", closeOnOverlayClick);

popupImage.addEventListener("click", closeOnOverlayClick);

popupAvatar.addEventListener("click", closeOnOverlayClick);

formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  formEditProfile.elements["button-save"].textContent = textSaving;
  updateProfile(
    formEditProfile.elements.name.value,
    formEditProfile.elements.description.value
  )
    .then((profile) => {
      nameInput.textContent = profile.name;
      jobInput.textContent = profile.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formEditProfile.elements["button-save"].textContent = textSave;
      closeModal(popupEditProfile);
    });
});

formNewPlace.addEventListener("submit", (evt) => {
  evt.preventDefault();
  formNewPlace.elements["button-save"].textContent = textSaving;
  createNewCard(
    formNewPlace.elements["place-name"].value,
    formNewPlace.elements.link.value
  )
    .then((card) => {
      placesList.prepend(
        createCard(cardTemplate, card, delCard, likeCard, openImagePopup, myId)
      );
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formNewPlace.elements["button-save"].textContent = textSave;
      closeModal(popupAddCard);
      formNewPlace.reset();
    });
});

formEditAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();
  formEditAvatar.elements["button-save"].textContent = textSaving;
  updateAvatar(formEditAvatar.elements["avatar-link"].value)
    .then((res) => {
      console.log(res);
      profileImage.setAttribute(
        "style",
        `background-image: url(${formEditAvatar.elements["avatar-link"].value})`
      );
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formEditAvatar.elements["button-save"].textContent = textSave;
      closeModal(popupAvatar);
    });
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

enableValidation(validationConfig);

Promise.all([getUserProfile(), getInitialCards()])
  .then((res) => {
    myId = res[0]["_id"];
    nameInput.textContent = res[0].name;
    jobInput.textContent = res[0].about;
    profileImage.setAttribute(
      "style",
      `background-image: url(${res[0].avatar})`
    );

    for (let i = 0; i < res[1].length; i++) {
      placesList.append(
        createCard(
          cardTemplate,
          res[1][i],
          delCard,
          likeCard,
          openImagePopup,
          myId
        )
      );
    }
  })
  .catch((err) => {
    console.log(err);
  });
