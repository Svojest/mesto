export {displayPopup, closePopup, closePressEscape, closeClickOverlay} 

// ОТКРЫТИЕ popup
function displayPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePressEscape);
}
// ЗАКРЫТИЕ popup
 function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePressEscape);
}

// ЗАКРЫТИЕ popup при нажатии Esc
function closePressEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}
// ЗАКРЫТИЕ popup по клику на оверлей
function closeClickOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}
