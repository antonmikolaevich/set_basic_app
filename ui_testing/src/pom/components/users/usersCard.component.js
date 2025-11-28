const BaseComponent = require("../../common/base.component");

class UsersCardComponent extends BaseComponent {
  constructor(page, index){
    super(`#usersTableBody tr:nth-child(${index})`, page);
  }

  get id () {
    return this.rootEl.locator('td:nth-child(1)');
  }

  get name () {
    return this.rootEl.locator('td:nth-child(2)');
  }
  
  get login () {
    return this.rootEl.locator('td:nth-child(3)');
  }

  get email () {
    return this.rootEl.locator('td:nth-child(4)');
  }

  get address () {
    return this.rootEl.locator('td:nth-child(5)');
  }

  async getCardsCount() {
    return await this.page.locator('div.card').count();
  }

}

module.exports = UsersCardComponent;
