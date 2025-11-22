const BaseComponent = require("../../common/base.component");

class UserSearchComponent extends BaseComponent {
  constructor(page){
    super('section:nth-child(1)', page);
  }

  get title () {
    return this.rootEl.locator('h2');
  }

  get searchInput () {
    return this.rootEl.locator('input#searchUserId');
  }
  
  get searchButton () {
    return this.rootEl.locator('button.btn-primary');
  }

  get errorMessage(){
    return this.rootEl.locator('div.text-danger');
  }

}

module.exports = UserSearchComponent;
