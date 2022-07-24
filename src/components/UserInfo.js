export default class UserInfo {
  constructor(titleSelector, aboutSelector, avatarSelector) {
    this._title = document.querySelector(titleSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {
      title: this._title.textContent,
      about: this._about.textContent,
    };
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._title.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
    this._avatar.alt = name;
    this._id = _id;
  }
}
