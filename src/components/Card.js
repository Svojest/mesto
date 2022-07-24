export default class Card {
  constructor(data, userId, cardSelector, handleCardClick, handleCardDelete, handleCardLike) {
    this._id = data._id; // id карточки
    this._ownerId = data.owner._id; // id создателя карточки
    this._name = data.name; // название карточки
    this._link = data.link; // ссылка на картинку карточки
    this._likes = data.likes;
    this._userId = userId; // id пользователя
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    // получение контекста
    this._handleDeleteCard = this._handleDeleteCard.bind(this)
    this._handleLike = this._handleLike.bind(this);
    this._handleStatusLikes = this._handleStatusLikes.bind(this);

  }

  _statusLikes() {
    // Если уже поставлен лайк пользователем, отобразить активыный лайк и наоборот
    if (
      this._likes.some((like) => {
        return like._id === this._userId;
      })
    ) {
      this._userLikes = true;
      this._buttonLike.classList.add('card__like_active');
    } else {
      this._userLikes = false;
      this._buttonLike.classList.remove('card__like_active');
    }
    this._likeCount.textContent = this._likes.length;
  }

  _handleLike() {
    const data = this._handleCardLike(this._handleStatusLikes, {
      cardId: this._id,
      userLikes: this._userLikes,
    });
  }

  _handleStatusLikes(data) {
    this._likes = data.likes;
    this._statusLikes();
  }

  _handleDeleteCard() {
    this._element.remove()
  }
  // ПОЛУЧЕНИЕ РАЗМЕТКИ
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  // СЛУШАТЕЛИ
  _setEventListeners() {
    this._buttonBin.addEventListener('click', () => {
      this._handleCardDelete(this._handleDeleteCard, this._id);
    });
    this._buttonLike.addEventListener('click', () => {
      this._handleLike();
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  //  ВОЗВРАЩЕНИЕ ЗАПОЛНЕННОЙ РАЗМЕТКИ
  generateCard() {
    // Получение элементов карточки
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._buttonLike = this._element.querySelector('.card__like');
    this._buttonBin = this._element.querySelector('.card__bin');
    this._likeCount = this._element.querySelector('.card__like-count');
    // убрать иконку корзины, если карточка была создана другим пользователем
    if (this._ownerId != this._userId) {
      this._buttonBin.remove();
    }
    // Заполнение карточки данными
    this._element.querySelector('.card__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._statusLikes();
    this._setEventListeners();
    return this._element;
  }
}
