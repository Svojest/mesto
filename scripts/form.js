
let formElement = document.querySelector(".popup__form"); // Воспользуйтесь методом querySelector()

let nameProfile = document.querySelector(".profile__title"); // Воспользуйтесь инструментом .querySelector()
let jobProfile = document.querySelector(".profile__subtitle"); // Воспользуйтесь инструментом .querySelector()
let nameInput = document.querySelector(".popup__input_text-name"); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector(".popup__input_text-about"); // Воспользуйтесь инструментом .querySelector()
let formSubmit = document.querySelector('.popup__button_save');
// Отображение по умолчанию
nameInput.setAttribute('value', nameProfile.textContent);
jobInput.setAttribute('value', jobProfile.textContent);


// Изменение
function formSubmitHandler(evt) {
    evt.preventDefault();
    nameProfile.innerHTML = nameInput.value;
    jobProfile.innerHTML = jobInput.value;
}

formElement.addEventListener("submit", formSubmitHandler);
formSubmit.addEventListener('click', closeOverlay);

