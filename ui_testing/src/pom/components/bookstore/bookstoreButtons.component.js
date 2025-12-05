const BaseComponent = require("../../common/base.component");

class BookstoreButtonsComponent extends BaseComponent {
  constructor(page){
    super('div.justify-content-between.mt-4', page);
  }

  get createButton () {
    return this.rootEl.locator('#openCreateStoreItemBtn');
  } 

  get editButton () {
    return this.rootEl.locator('#openEditStoreItemBtn');
  }

  get deleteButton () {
    return this.rootEl.locator('#openDeleteStoreItemBtn');
  }
}

module.exports = BookstoreButtonsComponent;