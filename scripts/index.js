const editProfileBtn = document.querySelector(".profile__btn-edit");
const modalWindow = document.querySelector(".popup");
const editCloseBtn = document.querySelector(".popup__button_type_close");

// Открытие popup
function addEditProfile() {
  modalWindow.classList.add("popup_opened");
  nameInput.setAttribute("value", nameProfile.textContent);
  jobInput.setAttribute("value", jobProfile.textContent);
}
function removeEditProfile() {
  modalWindow.classList.remove("popup_opened");
}

editProfileBtn.addEventListener("click", addEditProfile);
editCloseBtn.addEventListener("click", removeEditProfile);
