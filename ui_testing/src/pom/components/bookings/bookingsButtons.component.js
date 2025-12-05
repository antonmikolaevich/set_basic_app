const BaseComponent = require("../../common/base.component");

class BookingsButtonsComponent extends BaseComponent {
  constructor(page){
    super('div.justify-content-end.mt-4', page);
  }

  get createButton () {
    return this.rootEl.locator('#openCreateBookingBtn');
  } 

//   get editButton () {
//     return this.rootEl.locator('#openEditUserBtn');
//   }

//   get deleteButton () {
//     return this.rootEl.locator('#openDeleteUserBtn');
//   }
}

module.exports = BookingsButtonsComponent;