const editProfileBtn = document.querySelector(-'.profile__btn-edit');
const modalWindow = document.querySelector('.popup');
const editCloseBtn = document.querySelector('.popup__button_close');

// Открытие popup
function toggleEditProfile() {
  modalWindow.classList.toggle('popup_opened');
}

editProfileBtn.addEventListener('click', toggleEditProfile);
editCloseBtn.addEventListener('click', toggleEditProfile);

//Закрытие popup по нажатию overlay оверлею
function closeOverlay(event) {
    const clickOverlay = event.target === event.currentTarget;
    if(clickOverlay) {
        toggleEditProfile();
    }
}

modalWindow.addEventListener('click', closeOverlay);


