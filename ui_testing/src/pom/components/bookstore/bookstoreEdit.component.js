const BaseComponent = require("../../common/base.component");

class EditBookstoreComponent extends BaseComponent {
    constructor(page){
        super('form#editStoreItemForm', page);
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

    get productId () {
        return this.rootEl.locator('div.modal-body input#edit-store-product-id');
    }

    get availableQuantity () {
        return this.rootEl.locator(' div.modal-body input#edit-store-available');
    }   

    get bookedQuantity () {
        return this.rootEl.locator('div.modal-body input#edit-store-booked');
    }

    get soldQuantity () {
        return this.rootEl.locator('div.modal-body input#edit-store-sold');
    }

}

module.exports = EditBookstoreComponent;