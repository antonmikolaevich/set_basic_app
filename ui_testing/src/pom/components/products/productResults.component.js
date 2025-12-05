const BaseComponent = require("../../common/base.component");

class ProductsResultsComponent extends BaseComponent {
  constructor(page){
    super('section.row.mb-3', page);
  }

  get title () {
    return this.rootEl.locator('h3');
  } 

  get createButton () {
    return this.rootEl.locator('button#openCreateProductBtn');
  }
}

module.exports = ProductsResultsComponent;