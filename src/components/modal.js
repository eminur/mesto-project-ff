//Функция обработки нажатия на Esc
function escKeyHandler(evt) {
  if (evt.key === "Escape") {
    document.querySelectorAll(".popup_is-opened").forEach((element) => {
      element.classList.toggle("popup_is-opened");
    });
  }
}
// Функция переключения открытия и закрытия попапов
export function togglePopupIsOpened(element) {
  element.classList.toggle("popup_is-opened");
  if (element.classList.contains("popup_is-opened")) {
    document.addEventListener("keydown", escKeyHandler);
  } else {
    document.removeEventListener("kedown", escKeyHandler);
  }
}
//Функция открытия и закрытия попапа с картинкой
export const popupImg = (evt) => {
  const popupImage = document.querySelector(".popup_type_image");
  popupImage.querySelector(".popup__image").src = evt.target.src;
  togglePopupIsOpened(popupImage);
};
