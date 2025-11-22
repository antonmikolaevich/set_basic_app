const BaseComponent = require('../../common/base.component');

class BookingsCreateCardComponent extends BaseComponent {
    constructor(page){
        super('form#createBookingForm', page);
    }

    get user_id() {
        return this.rootEl.locator('input[name="user_id"]');
    }

    get product_id() {
        return this.rootEl.locator('input[name="product_id"]');
    }

    get deliveryAddress() {
        return this.rootEl.locator('input[name="delivery_address"]');
    }

    get deliveryDate() {
        return this.rootEl.locator('input[name="delivery_date"]');
    }
    
    get deliveryTime() {
        return this.rootEl.locator('input[name="delivery_time"]');
    }

    get quantity() {
        return this.rootEl.locator('input[name="quantity"]');
    }

    get createBtn(){
        return this.rootEl.locator('button.btn-primary');
    }
}

module.exports = BookingsCreateCardComponent;