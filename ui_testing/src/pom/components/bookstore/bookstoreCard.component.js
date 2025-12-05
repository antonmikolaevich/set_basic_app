const BaseComponent = require("../../common/base.component");

class BookstoreCardComponent extends BaseComponent {
  constructor(page, index){
    super(`#storeTableBody tr:nth-child(${index})`, page);
  }

  get id () {
    return this.rootEl.locator('td:nth-child(1)');
  }

  get productName () {
    return this.rootEl.locator('td:nth-child(2)');
  }
  
  get available_qty () {
    return this.rootEl.locator('td:nth-child(3)');
  }

  get booked_qty () {
    return this.rootEl.locator('td:nth-child(4)');
  }

  get delivered_qty () {
    return this.rootEl.locator('td:nth-child(5)');
  }

  async getBookstoresCount() {
    return await this.page.locator('div.card').count();
  }

}

module.exports = BookstoreCardComponent;
