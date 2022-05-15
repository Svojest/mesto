//Попап редактирования профиля
const editProfileBtn = document.querySelector(".profile__btn-edit");
const modalWindow = document.querySelector(".popup");
const editCloseBtn = document.querySelector(".popup__button_type_close");
const addBtn = document.querySelector(".profile__btn-add");
// Карточки (галлерея)
const cardsTemplate = document.querySelector("#cards").content;
const cardGallary = document.querySelector(".gallary__item");

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
  return cardNew;
};

initialCards.forEach(({ name, link }) => {
  const loadCards = cardContainer(link, name);
  cardGallary.append(loadCards);
});

function formAddCard() {
  const inputCardTitle = document.querySelector(
    ".popup__input_type_card-title"
    );
    const inputCardUrl = document.querySelector(".popup__input_type_card-url");
    const submitAddBtn = document.querySelector(".popup__button_type_add");
  
}
addBtn.addEventListener("click", formAddCard);
