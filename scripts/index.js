const btnEditProfile = document.querySelector(".profile__btn-edit");
const btnAddCard = document.querySelector(".profile__btn-add");

const profileEditForm = document.querySelector(".popup__form-edit");
const cardAddForm = document.querySelector(".popup__form-card");

const popupEditProfile = document.querySelector(".popup_edit-profile");
const inputTitle = profileEditForm.querySelector(".popup__input_type_name");
const inputAbout = profileEditForm.querySelector(".popup__input_type_about");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const btnCloseProfile = document.querySelector("#close-editProfile");
const btnCloseCard = document.querySelector("#close-addCard");

const templateCard = document.querySelector("#cards").content;
const locationCard = document.querySelector(".gallary__item");

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

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardContainer = (srcCard, titleCard) => {
  const cardNew = templateCard.querySelector(".card").cloneNode(true);
  const imageCard = cardNew.querySelector(".card__image");
  const buttonLike = cardNew.querySelector(".card__like");
  const buttonBin = cardNew.querySelector(".card__bin");

  imageCard.setAttribute('src', srcCard);
  imageCard.setAttribute('alt', titleCard);
  cardNew.querySelector('.card__title').textContent = titleCard;

  buttonLike.addEventListener("click", function () {
    buttonLike.classList.toggle("card__like_active");
  });

  buttonBin.addEventListener("click", function () {
    buttonBin.closest(".card").remove();
  });
  return cardNew;
};

initialCards.forEach(({ name, link }) => {
  const loadCards = cardContainer(link, name);
  locationCard.append(loadCards);
});