export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this)
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    } 
  }
  setEvenetListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      // Закрытие на клик крестика
      if (evt.target.classList.contains('popup__button_type_close')) {
        this.close();
      }
      // Закрытие на клик оверлея
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}
