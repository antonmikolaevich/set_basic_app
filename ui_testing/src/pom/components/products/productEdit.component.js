const BaseComponent = require("../../common/base.component");

class EditProductComponent extends BaseComponent {
    constructor(page){
        super('form#editProductForm', page);
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
        return this.rootEl.locator('div.modal-body input#edit-name');
    }

    get descriptionInput () {
        return this.rootEl.locator(' div.modal-body textarea#edit-description');
    }   

    get authorInput () {
        return this.rootEl.locator('div.modal-body input#edit-author');
    }

    get priceInput () {
        return this.rootEl.locator(' div.modal-body input#edit-price');
    }

    get imageInput () {
        return this.rootEl.locator('div.modal-body input#edit-image');
    }

    get roleId() {
        return this.rootEl.locator('div.modal-body input#edit-user-role-id');
    }

}

module.exports = EditProductComponent;