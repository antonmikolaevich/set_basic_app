const BaseComponent = require('../../common/base.component');

class UserCreateCardComponent extends BaseComponent {
    constructor(page){
        super('form#createUserForm', page);
    }

    get nameInput() {
        return this.rootEl.locator('input[name="name"]');
    }

    get emailInput() {
        return this.rootEl.locator('input[name="email"]');
    }

    get phoneInput() {
        return this.rootEl.locator('input[name="phone"]');
    }

    get addressInput() {
        return this.rootEl.locator('input[name="address"]');
    }
    
    get loginInput() {
        return this.rootEl.locator('input[name="login"]');
    }
    
    get roleIdInput() {
        return this.rootEl.locator('input[name="role_id"]');
    }

    get createBtn(){
        return this.rootEl.locator('button.btn-primary');
    }
}

module.exports = UserCreateCardComponent;