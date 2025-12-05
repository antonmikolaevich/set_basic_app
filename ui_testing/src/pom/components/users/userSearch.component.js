const BaseComponent = require("../../common/base.component");

class UserSearchComponent extends BaseComponent {
  constructor(page){
    super('#searchUserForm', page);
  }

  get userName () {
    return this.rootEl.locator('#searchUserName');
  }

  get userId () {
    return this.rootEl.locator('#searchUserId');
  }

  get login () {
    return this.rootEl.locator('#searchUserLogin');
  }

  get email () {
    return this.rootEl.locator('#searchUserEmail');
  }

  get address () {
    return this.rootEl.locator('#searchAddress');
  }

  get searchButton () {
    return this.rootEl.locator('button[type="submit"]');
  }


}

module.exports = UserSearchComponent;
