const BaseComponent = require("../../common/base.component");

class UsersResultsComponent extends BaseComponent {
  constructor(page){
    super('section.row.mb-3', page);
  }

  get title () {
    return this.rootEl.locator('h3');
  } 

  get createButton () {
    return this.rootEl.locator('button#openCreateUserBtn');
  }
}

module.exports = UsersResultsComponent;