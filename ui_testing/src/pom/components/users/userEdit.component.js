const BaseComponent = require("../../common/base.component");

class EditUserComponent extends BaseComponent {
    constructor(page){
        super('form#editUserForm', page);
    }

    get title () {
        return this.rootEl.locator('div.modal-header h5.modal-title');
    }

    get closeBtn () {
        return this.rootEl.locator('div.modal-header button.btn-close');
    }

    get updateBtn () {
        return this.rootEl.locator('div.modal-footer button.btn-primary');
    }

    get nameInput () {
        return this.rootEl.locator('div.modal-body input#edit-user-name');
    }

    get emailInput () {
        return this.rootEl.locator('div.modal-body input#edit-user-email');
    }   

    get phoneInput () {
        return this.rootEl.locator('div.modal-body input#edit-user-phone');
    }

    get addressInput () {
        return this.rootEl.locator('div.modal-body input#edit-user-address');
    }

    get loginInput () {
        return this.rootEl.locator('div.modal-body input#edit-user-login');
    }

    get roleId() {
        return this.rootEl.locator('div.modal-body input#edit-user-role-id');
    }

}

module.exports = EditUserComponent;