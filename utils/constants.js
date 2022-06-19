export { popupOpenImage, srcImage, nameImage, settingSelectors};
// Содержимое формы изоображения
const popupOpenImage = document.querySelector('.popup_image_open');
const srcImage = document.querySelector('.popup__image');
const nameImage = document.querySelector('.popup__name-image');



const settingSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButton: '.popup__button_type_save',
  inactiveButton: 'popup__button_inactive',
  inputErrorSelector: '.popup__input-error',
  errorText: 'popup__input-error_active',
};