import { initialCards } from './presetsCard.js';
import Card from './Card.js';
import FormValidation from './FormValidator.js';
import { displayPopup, closePopup, closeClickOverlay } from '../utils/utils.js';

// Кнопки для открытия popup
const btnEditProfile = document.querySelector('.profile__btn-edit');
const btnAddCard = document.querySelector('.profile__btn-add');
// Селекторы форм Edit и Add
const profileEditForm = document.querySelector('.popup__form-edit');
const cardAddForm = document.querySelector('.popup__form-card');
// Содержимое Edit
const popupEditProfile = document.querySelector('.popup_edit-profile');
const inputTitleProfile = profileEditForm.querySelector('.popup__input_type_name');
const inputAboutProfile = profileEditForm.querySelector('.popup__input_type_about');
// Имя и информация о профиле
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
// Кнопки закрытия
const btnCloseProfile = document.querySelector('#close-editProfile');
const btnCloseCard = document.querySelector('#close-addCard');
const btnCloseImage = document.querySelector('#close-popupImage');
// Куда нужно вставлять шаблон карт
const locationCard = document.querySelector('.gallary__item');
// Содержимое Add
const popupAddCard = document.querySelector('.popup_add-card');
const inputTitleCard = document.querySelector('.popup__input_type_card-title');
const inputUrlCard = document.querySelector('.popup__input_type_card-url');
// Содержимое формы изоображения
export const popupOpenImage = document.querySelector('.popup_image_open');
export const srcImage = document.querySelector('.popup__image');
export const nameImage = document.querySelector('.popup__name-image');

const settingSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButton: '.popup__button_type_save',
  inactiveButton: 'popup__button_inactive',
  inputErrorSelector: '.popup__input-error',
  errorText: 'popup__input-error_active',
};
// Отображение валидации у форм
const forms = Array.from(document.querySelectorAll(settingSelectors.formSelector));
forms.forEach((formElement) => {
  const Validation = new FormValidation(settingSelectors, formElement);
  Validation.enableValidation();
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    Validation._resetValidation();
  });
});
// ОТКРЫТИЕ popup EditProfile
function displayEditPopup() {
  inputTitleProfile.value = profileTitle.textContent;
  inputAboutProfile.value = profileSubtitle.textContent;
  displayPopup(popupEditProfile);
}
// СОХРАНЕНИЕ изменений при нажатии submit в EditProfile
function submitEditPopup(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputTitleProfile.value;
  profileSubtitle.textContent = inputAboutProfile.value;
  closePopup(popupEditProfile);
}
// СОЗДАНИЕ карточки
function createCard(item) {
  const card = new Card(item.name, item.link, '#cards');
  return card.generateCard();
}
// СОЗДАНИЕ карточки через форму
function addCardForm(evt) {
  evt.preventDefault();
  locationCard.prepend(
    createCard({
      name: inputTitleCard.value,
      link: inputUrlCard.value,
    })
  );
  cardAddForm.reset();
  closePopup(popupAddCard);
}
// ОТОБРАЖЕНИЕ всех карточек из массива
initialCards.forEach((item) => {
  locationCard.append(
    createCard({
      name: item.name,
      link: item.link,
    })
  );
});

// СЛУШАТЕЛИ
// ОТКРЫТИЕ popup
btnEditProfile.addEventListener('click', displayEditPopup);
// НАЖАТИЕ submit у EditProfile
profileEditForm.addEventListener('submit', submitEditPopup);
// ЗАКРЫТИЕ на крестик у EditProfile
btnCloseProfile.addEventListener('click', function () {
  closePopup(popupEditProfile);
});
// ОТКРЫТИЕ формы создания карточки
btnAddCard.addEventListener('click', function () {
  displayPopup(popupAddCard);
});
// НАЖАТИЕ submit у AddForm
cardAddForm.addEventListener('submit', addCardForm);
// ЗАКРЫТИЕ на крестик у AddForm
btnCloseCard.addEventListener('click', function () {
  closePopup(popupAddCard);
});
// ЗАКРЫТИЕ на крестик у OpenImage
btnCloseImage.addEventListener('click', function () {
  closePopup(popupOpenImage);
});
// ЗАКРЫТИЕ popups при нажатии на оверлей
popupEditProfile.addEventListener('mousedown', closeClickOverlay);
popupAddCard.addEventListener('mousedown', closeClickOverlay);
popupOpenImage.addEventListener('mousedown', closeClickOverlay);
