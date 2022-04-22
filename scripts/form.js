
let formElement = document.querySelector(".popup__form"); // Воспользуйтесь методом querySelector()

let nameProfile = document.querySelector(".profile__title"); // Воспользуйтесь инструментом .querySelector()
let jobProfile = document.querySelector(".profile__subtitle"); // Воспользуйтесь инструментом .querySelector()
let nameInput = document.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector(".popup__input_type_about"); // Воспользуйтесь инструментом .querySelector()
// Отображение по умолчанию



// Изменение
function formSubmitHandler(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    removeEditProfile();
}

formElement.addEventListener("submit", formSubmitHandler);


