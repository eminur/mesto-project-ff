// @todo: Темплейт карточки
const cardTemplate =  document.querySelector('#card-template').content;

// @todo: DOM узлы
const mainContent = document.querySelector('.content');
const placesList = mainContent.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(card,delCard){
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const cardDelButton = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');
  
  cardImg.src = card.link;
  cardImg.alt = "Изображение местности "+card.name;
  cardTitle.textContent = card.name;
  cardDelButton.addEventListener('click',delCard);

  return cardElement;
}

// @todo: Функция удаления карточки
const delCard = function (evt) {
  const delButton = evt.target;
  const placeItem = delButton.closest('.places__item');
  placeItem.remove();
}

// @todo: Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i++){
  placesList.append(createCard(initialCards[i],delCard));
}
