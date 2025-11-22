const BaseComponent = require("../../common/base.component");

class UsersCardComponent extends BaseComponent {
  constructor(page, index){
    super(`div.row.mt-4 div.col-md-4:nth-child(${index})`, page);
  }

  get id () {
    return this.rootEl.locator('p:nth-child(1)');
  }

  get name () {
    return this.rootEl.locator('p:nth-child(2)');
  }
  
  get email () {
    return this.rootEl.locator('p:nth-child(3)');
  }

  get phone () {
    return this.rootEl.locator('p:nth-child(4)');
  }

  get address () {
    return this.rootEl.locator('p:nth-child(5)');
  }

  get login () {
    return this.rootEl.locator('p:nth-child(6)');
  }

  get editBtn () {
    return this.rootEl.locator('button.edit-user-btn');
  }

  get deleteBtn () {
    return this.rootEl.locator('button.delete-user-btn')
  }

  async getCardsCount() {
    return await this.page.locator('div.card').count();
  }

}

module.exports = UsersCardComponent;
