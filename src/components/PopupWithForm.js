import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitBtn = this._popupForm.querySelector('.popup__button');
    // this._submitBtnText = this._submitBtn.textContent;
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
  load(text) {
    this._submitBtn.textContent = text; 
  }

  //Не удалось, isLoading не выполняется, не понял из-за чего
  // renderLoading(isLoading, loadingText = 'Сохранение...') {
  //   if (isLoading) {
  //     this._submitBtn.textContent = this._submitBtnText;
  //   } else {
  //     this._submitBtn.textContent = loadingText;
  //   }
  // }
  close() {
    super.close();
    this._popupForm.reset();
  }
}
