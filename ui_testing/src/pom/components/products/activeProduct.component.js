const BaseComponent = require("../../common/base.component");

class ActiveProductComponent extends BaseComponent {
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

  get id () {
    return this.cardEl.locator('p:nth-child(2)');
  }

  get name () {
    return this.cardEl.locator('h5');
  }
  
  get description () {
    return this.cardEl.locator('.ms-3 p.mb-2');
  }

  get author () {
    return this.cardEl.locator('.card-footer:nth-child(3)');
  }

  get price () {
    return this.cardEl.locator('.card-footer:nth-child(4)');
  }

  get editBtn () {
    return this.cardEl.locator('a.edit-btn');
  }

  get deleteBtn () {
    return this.cardEl.locator('button.delete-btn')
  }
}

module.exports = ActiveProductComponent;
