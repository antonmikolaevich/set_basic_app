const BaseComponent = require('../../common/base.component');

class BookstoreCreateCardComponent extends BaseComponent {
    constructor(page){
        super('form#createStoreItemForm', page);
    }

    get productId() {
        return this.rootEl.locator('input[name="product_id"]');
    }

    get availableQuantity() {
        return this.rootEl.locator('input[name="available_qty"]');
    }

    get bookedQuantity() {
        return this.rootEl.locator('input[name="booked_qty"]');
    }

    get soldQuantity() {
        return this.rootEl.locator('input[name="sold_qty"]');
    }

    get createBtn(){
        return this.rootEl.locator('button.btn-primary');
    }
}

module.exports = BookstoreCreateCardComponent;