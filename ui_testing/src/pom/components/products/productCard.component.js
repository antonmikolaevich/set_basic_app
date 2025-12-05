const BaseComponent = require("../../common/base.component");

class ProductsCardComponent extends BaseComponent {
  constructor(page, index){
    super(`div.row.mt-4 div.col-md-4:nth-child(${index})`, page);
  }

  get id () {
    return this.rootEl.locator('p:nth-child(2)');
  }

  get name () {
    return this.rootEl.locator('h5');
  }
  
  get description () {
    return this.rootEl.locator('.ms-3 p.mb-2');
  }

  get author () {
    return this.rootEl.locator('.card-footer:nth-child(3)');
  }

  get price () {
    return this.rootEl.locator('.card-footer:nth-child(4)');
  }

  get editBtn () {
    return this.rootEl.locator('a.edit-btn');
  }

  get deleteBtn () {
    return this.rootEl.locator('button.delete-btn')
  }

  async getCardsCount() {
    return await this.page.locator('div.card').count();
  }

}

module.exports = ProductsCardComponent;
