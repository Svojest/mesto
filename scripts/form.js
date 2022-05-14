
const formElement = document.querySelector(".popup__form"); // Воспользуйтесь методом querySelector()

const nameProfile = document.querySelector(".profile__title"); // Воспользуйтесь инструментом .querySelector()
const jobProfile = document.querySelector(".profile__subtitle"); // Воспользуйтесь инструментом .querySelector()
const nameInput = document.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector(".popup__input_type_about"); // Воспользуйтесь инструментом .querySelector()
// Отображение по умолчанию



// Изменение
function formSubmitHandler(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    removeEditProfile();
}

formElement.addEventListener("submit", formSubmitHandler);


