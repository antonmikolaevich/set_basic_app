const BaseComponent = require("../../common/base.component");

class BookingsSearchComponent extends BaseComponent {
  constructor(page){
    super('section:nth-child(1)', page);
  }

  get userName () {
    return this.rootEl.locator('#searchUserName');
  }

  get productName () {
    return this.rootEl.locator('#searchProductName');
  }

  get date (){
    return this.rootEl.locator('searchDate') 
  }
  
  get address (){
    return this.rootEl.locator('#searchAddress')
  }

  get status (){
    return this.rootEl.locator('#searchStatus')
  }


  get searchButton () {
    return this.rootEl.locator('button.btn-primary');
  }

  get errorMessage(){
    return this.rootEl.locator('div.text-danger');
  }

}

module.exports = BookingsSearchComponent;
