// Констатнты для нажатия фото у карточки
import { popupOpenImage, srcImage, nameImage } from './index.js';
import { displayPopup } from '../utils/utils.js';

export default class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  // ПОЛУЧЕНИЕ РАЗМЕТКИ
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  // ОБРАБОТЧИКИ
  // Нажатие на корзину и следствие удаление карточки
  _handleClickBin() {
    this._buttonBin.closest('.card').remove();
  }
  //Нажатие на лайк
  _handleClickLike() {
    this._buttonLike.classList.toggle('card__like_active');
  }
  //Нажатие на фото карточки
  _handleClickImage() {
    nameImage.textContent = this._name;
    srcImage.src = this._link;
    srcImage.alt = this._name;
    displayPopup(popupOpenImage);
  }

  // СЛУШАТЕЛИ
  _setEventListeners() {
    this._buttonBin.addEventListener('click', () => {
      this._handleClickBin();
    });
    this._buttonLike.addEventListener('click', () => {
      this._handleClickLike();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleClickImage();
    });
  }

  //  ВОЗВРАЩЕНИЕ ЗАПОЛНЕННОЙ РАЗМЕТКИ
  generateCard() {
    // Получение элементов карточки
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._buttonLike = this._element.querySelector('.card__like');
    this._buttonBin = this._element.querySelector('.card__bin');
    this._setEventListeners();
    // Заполнение карточки данными
    this._element.querySelector('.card__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._element;
  }
}
