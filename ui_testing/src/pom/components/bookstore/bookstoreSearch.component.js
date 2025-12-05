const BaseComponent = require("../../common/base.component");

class BookstoreSearchComponent extends BaseComponent {
  constructor(page){
    super('section:nth-child(1)', page);
  }

  get productName () {
    return this.rootEl.locator('#searchProductName');
  }
  
  get productId () {
    return this.rootEl.locator('#searchProductId');
  }

  get author (){
    return this.rootEl.locator('#searchAuthor');
  }

  get available_qty(){
    return this.rootEl.locator('#searchAvailableQty');
  }

  get booked_qty(){
    return this.rootEl.locator('#searchBookedQty');
  }

  get delivered_qty(){
    return this.rootEl.locator('#searchDeliveredQty');
  }

  get searchButton () {
    return this.rootEl.locator('button.btn-primary');
  }

  get errorMessage(){
    return this.rootEl.locator('div.alert.alert-warning');
  }

}

module.exports = BookstoreSearchComponent;
