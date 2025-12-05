const BaseComponent = require("../../common/base.component");

class UsersButtonsComponent extends BaseComponent {
  constructor(page){
    super('div.justify-content-between.mt-4', page);
  }

  get createButton () {
    return this.rootEl.locator('#openCreateUserBtn');
  } 

  get editButton () {
    return this.rootEl.locator('#openEditUserBtn');
  }

  get deleteButton () {
    return this.rootEl.locator('#openDeleteUserBtn');
  }
}

module.exports = UsersButtonsComponent;