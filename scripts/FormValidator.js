export default class FormValidation {
  constructor(selector, formElement) {
    this._selector = selector;
    this._formElement = formElement;
    this._inputs = Array.from(this._formElement.querySelectorAll(selector.inputSelector));
    this._buttonElement = this._formElement.querySelector(selector.submitButton);
  }
  // Показ ошибки и скрытие
  _showError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._selector.errorText);
  }
  _hideError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this._selector.errorText);
    errorElement.textContent = '';
  }
  // Проверка на валидность
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  }
  // Валидность нескольких полей
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  // Добавление кнопке класс с неактивной кнопкой
  _disableButton() {
    this._buttonElement.classList.add(this._selector.inactiveButton);
    this._buttonElement.disabled = true;
  }
  // Сброс ошибки и отключение кнопки
  _resetValidation() {
    this._inputs.forEach((inputElement) => {
      this._hideError(inputElement);
    });
    this._disableButton();
  }
  // Вкл или выкл кнопки после валидации
  _toggleButton() {
    if (this._hasInvalidInput(this._inputs)) {
      this._disableButton();
    } else {
      this._buttonElement.classList.remove(this._selector.inactiveButton);
      this._buttonElement.disabled = false;
    }
  }
  // Слушатели на все inputs
  _setEventListeners() {
    this._toggleButton();
    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButton();
      });
    });
  }
  // Вкл валидации
  enableValidation() {
    this._setEventListeners();
  }
}
