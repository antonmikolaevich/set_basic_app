const BaseComponent = require("../../common/base.component");

class ActiveBookingComponent extends BaseComponent {
  constructor(page) {
    super(`div.card-wrapper.visible`, page);
  }

  // Grab a specific card by index
  card(index) {
    return new CardWrapper(this.rootEl.nth(index));
  }
}

class CardWrapper {
  constructor(cardLocator) {
    this.cardEl = cardLocator;
  }

  get productName () {
    return this.cardEl.locator('.card-body h5');
  }

  get productId () {
    return this.cardEl.locator('.card-body p');
  }
  
  get userName () {
    return this.cardEl.locator('.list-group.list-group-flush .list-group-item:nth-child(1)');
  }

  get deliveryDate () {
    return this.cardEl.locator('.list-group.list-group-flush .list-group-item:nth-child(2)');
  }

  get deliveryTime () {
    return this.cardEl.locator('.list-group.list-group-flush .list-group-item:nth-child(3)');
  }

  get deliveryAddress () {
    return this.cardEl.locator('.list-group.list-group-flush .list-group-item:nth-child(4)');
  }

  get status () {
    return this.cardEl.locator('.list-group.list-group-flush .list-group-item:nth-child(5)');
  }

  get approveButton () {
    return this.cardEl.locator('button[data-status="APPROVED"]');
  }

  get rejectButton () {
    return this.cardEl.locator('button[data-status="REJECTED"]')
  }

  get closeButton (){
    return this.cardEl.locator('button[data-status="CLOSED"]')
  }
}

module.exports = ActiveBookingComponent;
