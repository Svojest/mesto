import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._link = document.querySelector('.popup__image');
    this._name = document.querySelector('.popup__name-image');
  }

  open(nameImage, srcImage) {
    super.open();
    console.log(srcImage)
    this._link.src = srcImage;
    this._link.alt = nameImage;
    this._name.textContent = nameImage;
  }
}
