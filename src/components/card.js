import { putLike, delLike } from "./api";
import { deleteCard } from "./api";

//Функция создания карточки
export function createCard(
  cardTemplate,
  card,
  delCard,
  likeCard,
  openImagePopup,
  myId
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const cardDelButton = cardElement.querySelector(".card__delete-button");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCount = cardElement.querySelector(".card__like-count");

  cardImg.src = card.link;
  cardImg.alt = "Изображение местности " + card.name;
  cardTitle.textContent = card.name;
  cardLikeCount.textContent = card.likes.length;

  if (card.owner["_id"] === myId) {
    cardDelButton.addEventListener("click", (evt) => {
      delCard(evt, card["_id"]);
    });
  } else {
    cardDelButton.remove();
  }

  for (let i = 0; i < card.likes.length; i++) {
    if (card.likes[i]["_id"] === myId) {
      cardLikeButton.classList.add("card__like-button_is-active");
      break;
    }
  }

  cardLikeButton.addEventListener("click", (evt) => {
    likeCard(evt, card["_id"], cardLikeCount);
  });

  cardImg.addEventListener("click", openImagePopup);

  return cardElement;
}

// Функция удаления карточки
export const delCard = (evt, cardId) => {
  deleteCard(cardId)
    .then((res) => {
      const placeItem = evt.target.closest(".places__item");
      placeItem.remove();
    })
    .catch((err) => {
      console.log(err);
    });
};

//Функция установки лайка
export const likeCard = (evt, cardId, cardLikeCount) => {
  if (!evt.target.classList.contains("card__like-button_is-active")) {
    putLike(cardId)
      .then((res) => {
        evt.target.classList.add("card__like-button_is-active");
        cardLikeCount.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    delLike(cardId)
      .then((res) => {
        evt.target.classList.remove("card__like-button_is-active");
        cardLikeCount.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
