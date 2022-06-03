const btnEditProfile = document.querySelector(".profile__btn-edit");
const btnAddCard = document.querySelector(".profile__btn-add");

const profileEditForm = document.querySelector(".popup__form-edit");
const cardAddForm = document.querySelector(".popup__form-card");

const popupEditProfile = document.querySelector(".popup_edit-profile");
const inputTitleProfile = profileEditForm.querySelector(
  ".popup__input_type_name"
);
const inputAboutProfile = profileEditForm.querySelector(
  ".popup__input_type_about"
);
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

const btnCloseProfile = document.querySelector("#close-editProfile");
const btnCloseCard = document.querySelector("#close-addCard");
const btnCloseImage = document.querySelector("#close-popupImage");

const templateCard = document.querySelector("#cards").content;
const locationCard = document.querySelector(".gallary__item");

const popupAddCard = document.querySelector(".popup_add-card");
const inputTitleCard = document.querySelector(".popup__input_type_card-title");
const inputUrlCard = document.querySelector(".popup__input_type_card-url");

const popupOpenImage = document.querySelector(".popup_image_open");
const srcImage = document.querySelector(".popup__image");
const nameImage = document.querySelector(".popup__name-image");

function displayPopup(popup) {
  popup.classList.add("popup_opened");
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

//Открытие Popup и слушатель
function displayEditPopup() {
  inputTitleProfile.value = profileTitle.textContent;
  inputAboutProfile.value = profileSubtitle.textContent;
  displayPopup(popupEditProfile);
}
btnEditProfile.addEventListener("click", displayEditPopup);

//Сохранение на нажатие submit
function submitEditPopup(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputTitleProfile.value;
  profileSubtitle.textContent = inputAboutProfile.value;
  closePopup(popupEditProfile);
}

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


const handleCardContainer = (srcCard, titleCard) => {
  const cardNew = templateCard.querySelector(".card").cloneNode(true);
  const imageCard = cardNew.querySelector(".card__image");
  const buttonLike = cardNew.querySelector(".card__like");
  const buttonBin = cardNew.querySelector(".card__bin");

  imageCard.setAttribute("src", srcCard);
  imageCard.setAttribute("alt", titleCard);
  cardNew.querySelector(".card__title").textContent = titleCard;

  buttonLike.addEventListener("click", function () {
    buttonLike.classList.toggle("card__like_active");
  });

  buttonBin.addEventListener("click", function () {
    buttonBin.closest(".card").remove();
  });

  imageCard.addEventListener("click", function () {
    srcImage.setAttribute("src", srcCard);
    srcImage.setAttribute("alt", titleCard);
    nameImage.textContent = titleCard;
    displayPopup(popupOpenImage);
    console.log(titleCard);
  });
  return cardNew;
};

// отображение карточек на страницу
initialCards.forEach(({ name, link }) => {
  const loadCards = handleCardContainer(link, name);
  locationCard.append(loadCards);
});


// содержимое формы создания карточки
const addCardForm = (evt) => {
  evt.preventDefault();
  locationCard.prepend(
    handleCardContainer(inputUrlCard.value, inputTitleCard.value)
  );
  inputUrlCard.value = "";
  inputTitleCard.value = "";
  closePopup(popupAddCard);
};


profileEditForm.addEventListener("submit", submitEditPopup);

btnCloseProfile.addEventListener("click", function () {
  closePopup(popupEditProfile);
});

// открытие формы создания карточки
btnAddCard.addEventListener("click", function () {
  displayPopup(popupAddCard);
});

// сохранине формы создания карточки
cardAddForm.addEventListener("submit", addCardForm);
// закрытие через крестик
btnCloseCard.addEventListener("click", function () {
  closePopup(popupAddCard);
});

btnCloseImage.addEventListener("click", function () {
  closePopup(popupOpenImage);
});





