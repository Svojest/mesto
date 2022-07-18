export default class UserInfo {
  constructor(titleSelector, aboutSelector) {
    this._title = document.querySelector(titleSelector);
    this._about = document.querySelector(aboutSelector);
  }
  getUserInfo() {
    return {
      title: this._title.textContent,
      about: this._about.textContent,
    };
  }
  setUserInfo(title, about) {
    this._title.textContent = title;
    this._about.textContent = about;
  }
}
