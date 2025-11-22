const BaseComponent = require("../../common/base.component");

class BookstoreCardComponent extends BaseComponent {
  constructor(page, index){
    super(`div.row.mt-4 div.col-md-4:nth-child(${index})`, page);
  }

  get bookstoreItemId () {
    return this.rootEl.locator('p:nth-child(1)');
  }

  get productName () {
    return this.rootEl.locator('p:nth-child(2)');
  }
  
  get description () {
    return this.rootEl.locator('p:nth-child(3)');
  }

  get author () {
    return this.rootEl.locator('p:nth-child(4)');
  }

  get price () {
    return this.rootEl.locator('p:nth-child(5)');
  }

  get availableQuantity () {
    return this.rootEl.locator('p:nth-child(7)');
  }

  get bookedQuantity () {
    return this.rootEl.locator('p:nth-child(8)');
  }

  get soldQuantity () {
    return this.rootEl.locator('p:nth-child(9)');
  }

  get editBtn () {
    return this.rootEl.locator('button.edit-store-btn');
  }


  get deleteBtn () {
    return this.rootEl.locator('button.delete-store-btn')
  }

  async getBookstoresCount() {
    return await this.page.locator('div.card').count();
  }

}

module.exports = BookstoreCardComponent;
