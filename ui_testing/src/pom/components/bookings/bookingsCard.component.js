const BaseComponent = require("../../common/base.component");

class BookingsCardComponent extends BaseComponent {
  constructor(page, index){
    super(`#bookingCards div.card-wrapper:nth-child(${index})`, page);
  }

  get productName () {
    return this.rootEl.locator('.card-body h5');
  }

  get productId () {
    return this.rootEl.locator('.card-body p');
  }
  
  get userName () {
    return this.rootEl.locator('.list-group.list-group-flush .list-group-item:nth-child(1)');
  }

  get deliveryDate () {
    return this.rootEl.locator('.list-group.list-group-flush .list-group-item:nth-child(2)');
  }

  get deliveryTime () {
    return this.rootEl.locator('.list-group.list-group-flush .list-group-item:nth-child(3)');
  }

  get deliveryAddress () {
    return this.rootEl.locator('.list-group.list-group-flush .list-group-item:nth-child(4)');
  }

  get status () {
    return this.rootEl.locator('.list-group.list-group-flush .list-group-item:nth-child(5)');
  }

  get approveButton () {
    return this.rootEl.locator('button[data-status="APPROVED"]');
  }

  get rejectButton () {
    return this.rootEl.locator('button[data-status="REJECTED"]')
  }

  get closeButton (){
    return this.rootEl.locator('button[data-status="CLOSED"]')
  }

}

module.exports = BookingsCardComponent;
