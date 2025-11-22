const BaseComponent = require("../../common/base.component");

class EditBookingsComponent extends BaseComponent {
    constructor(page){
        super('form#editBookingForm', page);
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

    get user_id () {
        return this.rootEl.locator('div.modal-body input#edit-user-id');
    }

    get product_id () {
        return this.rootEl.locator('div.modal-body input#edit-product-id');
    }   

    get deliveryAddress () {
        return this.rootEl.locator('div.modal-body input#edit-delivery-address');
    }

    get deliveryDate () {
        return this.rootEl.locator('div.modal-body input#edit-delivery-date');
    }

    get deliveryTime(){
        return this.rootEl.locator('div.modal-body input#edit-delivery-time');
    }

    get status(){
        return this.rootEl.locator('div.modal-body input#edit-status-id');
    }

    get quantity () {
        return this.rootEl.locator('div.modal-body input#edit-quantity');
    }

}

module.exports = EditBookingsComponent;