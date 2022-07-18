import './index.css';

import { initialCards } from '../components/presetsCard.js';

import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidation from '../components/FormValidator.js';

import { settingSelectors } from '../utils/constants.js';

// Кнопки для открытия popup
const btnEditProfile = document.querySelector('.profile__btn-edit');
const btnAddCard = document.querySelector('.profile__btn-add');
// Содержимое Edit
const inputTitleProfile = document.querySelector('.popup__input_type_name');
const inputAboutProfile = document.querySelector('.popup__input_type_about');
// Содержимое Card
const inputTitleCard = document.querySelector('.popup__input_type_card-title');
const inputUrlCard = document.querySelector('.popup__input_type_card-url');

// Куда нужно вставлять шаблон карт
const locationCard = document.querySelector('.gallary__item');

// ОТКРЫТИЕ EditForm
function displayEditForm() {
  // Подставление имеющихся данных в форму
  const currentUserInfo = userInfo.getUserInfo();
  inputTitleProfile.value = currentUserInfo.title;
  inputAboutProfile.value = currentUserInfo.about;
  popupEditForm.open();
}

function displayAddForm() {
  popupAddForm.open();
}
function displayImagePopup(srcImage, nameImage) {
  popupWithImage.open(srcImage, nameImage);
}

// СОХРАНЕНИЕ изменений при нажатии submit в Edit Form
function submitEditPopup(evt, data) {
  evt.preventDefault();
  // Подставление новых данных на страницу
  userInfo.setUserInfo(data['form-name'], data['form-about']);
  console.log(data);
  popupEditForm.close();
}

// Добавление карточки при нажатии submit в Add Form
function submitAddPopup(evt, data) {
  evt.preventDefault();
  const cardElement = createCard({
    name: data['card-name'],
    link: data['card-url'],
  });
  cardList.prependItem(cardElement)

  popupAddForm.close();
}

// СОЗДАНИЕ карточки
function createCard(item) {
  const card = new Card(item.name, item.link, '#cards', displayImagePopup);
  const cardElement = card.generateCard();
  return cardElement;
}

// Отображение информации пользователя
const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

// Отображение изображения
const popupWithImage = new PopupWithImage('.popup_image_open');
// Отображение формы Edit с обработчиком кнопки submit
const popupEditForm = new PopupWithForm('.popup_edit-profile', submitEditPopup);
//
const popupAddForm = new PopupWithForm('.popup_add-card', submitAddPopup);

// Добавление начальных карточек
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.setItem(cardElement);
    },
  },
  '.gallary__item'
);

// Отображение валидации у форм
const forms = Array.from(document.querySelectorAll(settingSelectors.formSelector));
forms.forEach((formElement) => {
  const Validation = new FormValidation(settingSelectors, formElement);
  Validation.enableValidation();
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    Validation.resetValidation();
  });
});

// Слушатель. Открыть EditForm при нажатии на кнопку
btnEditProfile.addEventListener('click', displayEditForm);
// Слушатель. Открыть AddForm при нажатии на кнопку
btnAddCard.addEventListener('click', displayAddForm);

popupWithImage.setEvenetListeners();
popupEditForm.setEvenetListeners();
popupAddForm.setEvenetListeners();

cardList.renderedItems();
