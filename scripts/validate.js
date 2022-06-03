// Показ ошибки и скрытие
function showError(formElement, inputElement, errorMessage, selector) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selector.errorText);
}
function hideError(formElement, inputElement, selector) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(selector.errorText);
  errorElement.textContent = "";
}
//Проверка на валидность
function isValid(formElement, inputElement, selector) {
  if (!inputElement.validity.valid) {
    showError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      selector
    );
  } else {
    hideError(formElement, inputElement, selector);
  }
}
//Валидность нескольких полей
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
//Добавление кнопке класс с неактивной кнопкой
function disableButton(button, inactiveBtnSelector) {
  button.classList.add(inactiveBtnSelector);
  button.disabled = true;
}
//Сброс ошибки и отключение кнопки
function resetValidation(formElement, selector) {
  const inputs = Array.from(
    formElement.querySelectorAll(selector.inputSelector)
  );
  const buttonElement = formElement.querySelector(selector.submitButton);
  inputs.forEach((inputElement) => {
    hideError(formElement, inputElement, selector);
  });
  disableButton(buttonElement, selector.inactiveButton);
}
//Вкл или выкл кнопки после валидации
function toggleButton(inputList, buttonElement, selector) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, selector.inactiveButton);
  } else {
    buttonElement.classList.remove(selector.inactiveButton);
    buttonElement.disabled = false;
  }
}
//Вкл валидации во всех формах
function enableValidation(selector) {
  const forms = Array.from(document.querySelectorAll(selector.formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      resetValidation(formElement, selector);
    });
    setEventListeners(formElement, selector);
  });
}
//Слушатели на все inputs
function setEventListeners(formElement, selector) {
  const inputs = Array.from(
    formElement.querySelectorAll(selector.inputSelector)
  );
  const buttonElement = formElement.querySelector(selector.submitButton);
  toggleButton(inputs, buttonElement, selector);
  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      isValid(formElement, inputElement, selector);
      toggleButton(inputs, buttonElement, selector);
    });
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButton: ".popup__button_type_save",
  inactiveButton: "popup__button_inactive",
  inputErrorSelector: ".popup__input-error",
  errorText: "popup__input-error_active",
});
