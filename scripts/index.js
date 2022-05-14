//Попап редактирования профиля
const editProfileBtn = document.querySelector(".profile__btn-edit");
const modalWindow = document.querySelector(".popup");
const editCloseBtn = document.querySelector(".popup__button_type_close");
// Карточки (галлерея)
const cardsTemplate = document.querySelector("#cards").content;
const cardGallary = document.querySelector(".gallary__item");

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

//Отображение карточек (галлери)
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
  const cardNew = cardsTemplate.querySelector(".card").cloneNode(true);
  const imageCard = cardNew.querySelector(".card__image");
  const buttonLike = cardNew.querySelector(".card__like");
  const buttonBin = cardNew.querySelector('.card_bin');

  imageCard.setAttribute("src", srcCard);
  imageCard.setAttribute("alt", titleCard);
  cardNew.querySelector(".card__title").textContent = titleCard;
  return cardNew;
};

initialCards.forEach(({ name, link }) => {
  const el = cardContainer(link, name);
  cardGallary.append(el)
});
