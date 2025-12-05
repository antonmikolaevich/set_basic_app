const BaseComponent = require('./base.component');

class HeaderComponent extends BaseComponent {
  constructor(page){
    super('nav.navbar', page)
  }

  get productsItem() {
    return this.rootEl.locator('li.nav-item:nth-child(1) a');
  }

  get bookingsItem(){
    return this.rootEl.locator('li.nav-item:nth-child(2) a');
  }

  get bookstoreItem(){
    return this.rootEl.locator('li.nav-item:nth-child(3) a');
  }

  get usersItem(){
    return this.rootEl.locator('li.nav-item:nth-child(4) a');
  }
}

module.exports = HeaderComponent;
