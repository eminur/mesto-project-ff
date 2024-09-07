//Функция обработки нажатия на Esc
function escKeyHandler(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

export function showModal(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", escKeyHandler);
}

export function closeModal(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escKeyHandler);
}

export function closeOnOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}
