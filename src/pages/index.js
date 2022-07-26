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
const formValidators = {};

// ОТКРЫТИЕ EditForm
function displayEditForm() {
  // Подставление имеющихся данных в форму
  const currentUserInfo = userInfo.getUserInfo();
  inputTitleProfile.value = currentUserInfo.title;
  inputAboutProfile.value = currentUserInfo.about;
  popupEditForm.open();
  formValidators['form-edit'].resetValidation();
}

function displayAddForm() {
  popupAddForm.open();
  formValidators['form-add'].resetValidation();
}

function displayImagePopup(srcImage, nameImage) {
  popupWithImage.open(srcImage, nameImage);
}

function displayAvatarForm() {
  popupUpdateAvatar.open();
  formValidators['form-update-avatar'].resetValidation();
}
function displayDeleteForm(handleConfirm, data) {
  popupFormDelete.open(handleConfirm, data);
}

// СОХРАНЕНИЕ изменений при нажатии submit в Edit Form
function submitEditPopup(evt, data) {
  evt.preventDefault();
  // Подставление новых данных на страницу
  const name = data['form-name'];
  const about = data['form-about'];
  api
    .setUserInfo({ name, about })
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEditForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditForm.load('Сохранить');
    });
  popupEditForm.load('Сохранение...');
  // popupEditForm.renderLoading()
}

// Добавление карточки при нажатии submit в Add Form
function submitAddPopup(evt, data) {
  evt.preventDefault();
  const name = data['card-name'];
  const link = data['card-url'];
  api
    .addCard({ name, link })
    .then((res) => {
      const cardElement = createCard(res, res.owner._id);
      cardList.prependItem(cardElement);
      popupAddForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddForm.load('Создать');
    });
  popupAddForm.load('Создание...');
}

function submitUpdateAvatar(evt, data) {
  evt.preventDefault();
  const url = data['avatar-url'];
  api
    .setAvatar({ avatar: url })
    .then((res) => {
      userInfo.setUserInfo(res);
      popupUpdateAvatar.close();
    })
    .catch((res) => {
      console.log(res);
    })
    .finally(() => {
      popupUpdateAvatar.load('Сохранить');
    });
  popupUpdateAvatar.load('Сохранение...');
}

function submitDeletePopup(evt, handleDelete, cardId) {
  evt.preventDefault();
  api
    .deleteCard(cardId)
    .then(() => {
      handleDelete();
      popupFormDelete.close();
    })
    .catch((res) => {
      console.log(res);
    });
}

function displayStatusLike(handleStatusLikes, { cardId, userLikes }) {
  if (userLikes === false) {
    api
      .setLike(cardId)
      .then((res) => {
        handleStatusLikes(res);
      })
      .catch((res) => {
        console.log(res);
      });
  } else {
    api
      .unsetLike(cardId)
      .then((res) => {
        handleStatusLikes(res);
      })
      .catch((res) => {
        console.log(res);
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

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidation(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(settingSelectors);
// // Отображение валидации у форм
// const forms = Array.from(document.querySelectorAll(settingSelectors.formSelector));
// forms.forEach((formElement) => {
//   const validation = new FormValidation(settingSelectors, formElement);
//   validation.enableValidation();
//   validation.resetValidation();
// });

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
