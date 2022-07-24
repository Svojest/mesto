import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._handleSubmitForm = handleSubmitForm;
  }
  open(handleConfirm, data) {
    this._handleConfirm = handleConfirm;
    this._data = data;
    super.open();
  }
  setEvenetListeners() {
    super.setEvenetListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      this._handleSubmitForm(evt, this._handleConfirm, this._data);
    });
  }
}
