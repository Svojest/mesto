export { settingSelectors, popupElement };

const settingSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButton: '.popup__button_type_save',
  inactiveButton: 'popup__button_inactive',
  inputErrorSelector: '.popup__input-error',
  errorText: 'popup__input-error_active',
};
const popupElement = document.querySelector('.popup')