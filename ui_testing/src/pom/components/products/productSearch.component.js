const BaseComponent = require("../../common/base.component");

class ProductsSearchComponent extends BaseComponent {
  constructor(page){
    super('section:nth-child(1)', page);
  }

  get title () {
    return this.rootEl.locator('h2');
  }

  get productId () {
    return this.rootEl.locator('#searchId');
  }

  get productName () {
    return this.rootEl.locator('##searchName');
  }

  get author(){
    return this.rootEl.locator('#searchAuthor');
  }

  get price (){
    return this.rootEl.locator('#searchPrice'); 
  }
  
  get searchButton () {
    return this.rootEl.locator('button.btn-primary');
  }

  get errorMessage(){
    return this.rootEl.locator('div.text-danger');
  }

}

module.exports = ProductsSearchComponent;
