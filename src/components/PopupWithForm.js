import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._handleSubmitForm = handleSubmitForm;
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
  }
  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEvenetListeners() {
    super.setEvenetListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      this._handleSubmitForm(evt, this._getInputValues());
    });
  }
  close() {
    super.close();
    this._popupForm.reset();
  }
  
}
