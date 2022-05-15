const btnEditProfile = document.querySelector(".profile__btn-edit");
const btnAddCard = document.querySelector(".profile__btn-add");

const profileEditForm = document.querySelector(".popup__form-edit");

const popupEditProfile = document.querySelector(".popup_edit-profile");
const inputTitle = profileEditForm.querySelector(".popup__input_type_name");
const inputAbout = profileEditForm.querySelector(".popup__input_type_about");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const btnCloseProfile = document.querySelector(".popup__button_type_close");

function displayPopup(popup) {
  popup.classList.add("popup_opened");
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

//Открытие Popup и слушатель
function displayEditPopup() {
  inputTitle.setAttribute("value", profileTitle.textContent);
  inputAbout.setAttribute("value", profileSubtitle.textContent);
  displayPopup(popupEditProfile);
}
btnEditProfile.addEventListener("click", displayEditPopup);

//Сохранение на нажатие submit
function submitEditPopup(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputTitle.value;
  profileSubtitle.textContent = inputAbout.value;
  closePopup(popupEditProfile);
}
profileEditForm.addEventListener("submit", submitEditPopup);

btnCloseProfile.addEventListener("click", function () {
  closePopup(popupEditProfile);
});


