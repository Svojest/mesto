import './index.css';

import Api from '../components/Api.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidation from '../components/FormValidator.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';

import {
  settingSelectors,
  btnEditProfile,
  btnAddCard,
  btnUpdateAvatar,
  inputAboutProfile,
  inputTitleProfile,
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
  headers: {
    authorization: '0565dd97-638e-4b52-968c-599227ddda4c',
    'Content-Type': 'application/json',
  },
});

let cardList = {};

// ОТКРЫТИЕ EditForm
function displayEditForm() {
  // Подставление имеющихся данных в форму
  const currentUserInfo = userInfo.getUserInfo();
  inputTitleProfile.value = currentUserInfo.title;
  inputAboutProfile.value = currentUserInfo.about;
  popupEditForm.load('Сохранить');
  popupEditForm.open();
}

function displayAddForm() {
  popupAddForm.load('Создать');
  popupAddForm.open();
}

function displayImagePopup(srcImage, nameImage) {
  popupWithImage.open(srcImage, nameImage);
}

function displayAvatarForm() {
  popupUpdateAvatar.load('Сохранить');
  popupUpdateAvatar.open();
}
function displayDeleteForm(handleConfirm, data) {
  popupFormDelete.load('Да');
  popupFormDelete.open(handleConfirm, data);
}

// СОХРАНЕНИЕ изменений при нажатии submit в Edit Form
function submitEditPopup(evt, data) {
  evt.preventDefault();
  // Подставление новых данных на страницу
  const name = data['form-name'];
  const about = data['form-about'];
  api.setUserInfo({ name, about }).then((res) => {
    userInfo.setUserInfo(res);
  });
  popupEditForm.load('Сохранение...');
  popupEditForm.close();
}

// Добавление карточки при нажатии submit в Add Form
function submitAddPopup(evt, data) {
  evt.preventDefault();
  const name = data['card-name'];
  const link = data['card-url'];
  api.addCard({ name, link }).then((res) => {
    const cardElement = createCard(res, res.owner._id);
    cardList.prependItem(cardElement);
  });
  popupAddForm.load('Создание...');
  popupAddForm.close();
}

function submitUpdateAvatar(evt, data) {
  evt.preventDefault();
  const url = data['avatar-url'];
  api.setAvatar({ avatar: url }).then((res) => {
    userInfo.setUserInfo(res);
  });
  popupUpdateAvatar.load('Сохранение...');
  popupUpdateAvatar.close();
}

function submitDeletePopup(evt, handleDelete, cardId) {
  evt.preventDefault();
  api.deleteCard(cardId).then(() => {
    handleDelete();
  });
  popupFormDelete.load('Удаление...');
  popupFormDelete.close();
}

function displayStatusLike(handleStatusLikes, { cardId, userLikes }) {
  if (userLikes === false) {
    api.setLike(cardId).then((res) => {
      handleStatusLikes(res);
    });
  } else {
    api.unsetLike(cardId).then((res) => {
      handleStatusLikes(res);
    });
  }
}
// СОЗДАНИЕ карточки
function createCard(item, userId) {
  const card = new Card(
    item,
    userId,
    '#cards',
    displayImagePopup,
    displayDeleteForm,
    displayStatusLike
  );
  const cardElement = card.generateCard();
  return cardElement;
}

// Отображение информации пользователя
const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__image');

// // Отображение изображения
const popupWithImage = new PopupWithImage('.popup_image_open');
// // Отображение формы Edit с обработчиком кнопки submit
const popupEditForm = new PopupWithForm('.popup_edit-profile', submitEditPopup);
// //
const popupAddForm = new PopupWithForm('.popup_add-card', submitAddPopup);

const popupUpdateAvatar = new PopupWithForm('.popup_update-avatar', submitUpdateAvatar);

const popupFormDelete = new PopupWithConfirm('.popup_confirm', submitDeletePopup);
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    // Добавление начальных карточек
    cardList = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          const cardElement = createCard(item, userData._id);
          cardList.setItem(cardElement);
        },
      },
      '.gallery__item'
    );
    cardList.renderedItems();
  })
  .catch((err) => {
    console.log(`Ошибка ${err}`);
  });

// Слушатель. Открыть EditForm при нажатии на кнопку
btnEditProfile.addEventListener('click', displayEditForm);
// // Слушатель. Открыть AddForm при нажатии на кнопку
btnAddCard.addEventListener('click', displayAddForm);
btnUpdateAvatar.addEventListener('click', displayAvatarForm);

popupWithImage.setEvenetListeners();
popupEditForm.setEvenetListeners();

popupAddForm.setEvenetListeners();
popupUpdateAvatar.setEvenetListeners();
popupFormDelete.setEvenetListeners();
