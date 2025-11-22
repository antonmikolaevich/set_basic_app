const BaseComponent = require("../../common/base.component");

class BookingsCardComponent extends BaseComponent {
  constructor(page, index){
    super(`div.row.mt-4 div.col-md-4:nth-child(${index})`, page);
  }

  get id () {
    return this.rootEl.locator('p:nth-child(1)');
  }

  get productName () {
    return this.rootEl.locator('p:nth-child(2)');
  }
  
  get userName () {
    return this.rootEl.locator('p:nth-child(3)');
  }

  get deliveryAddress () {
    return this.rootEl.locator('p:nth-child(4)');
  }

  get deliveryTime () {
    return this.rootEl.locator('p:nth-child(5)');
  }

  get status () {
    return this.rootEl.locator('p:nth-child(6)');
  }

  get quantity () {
    return this.rootEl.locator('p:nth-child(7)');
  }

  get editBtn () {
    return this.rootEl.locator('button.edit-booking-btn');
  }

  get deleteBtn () {
    return this.rootEl.locator('button.delete-booking-btn')
  }

  async getBookingsCount() {
    return await this.page.locator('div.card').count();
  }

}

module.exports = BookingsCardComponent;
