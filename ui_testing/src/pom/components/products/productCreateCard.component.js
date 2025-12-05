const BaseComponent = require('../../common/base.component');

class ProudctCreateCardComponent extends BaseComponent {
    constructor(page){
        super('form#createProductForm', page);
    }

    get nameInput() {
        return this.rootEl.locator('input[name="name"]');
    }

    get authorInput() {
        return this.rootEl.locator('input[name="author"]');
    }

    get descriptionInput() {
        return this.rootEl.locator('textarea[name="description"]');
    }

    get priceInput() {
        return this.rootEl.locator('input[name="price"]');
    }
    
    get imagePathInput() {
        return this.rootEl.locator('input[name="image_path"]');
    }

    get createBtn(){
        return this.rootEl.locator('button.btn-primary');
    }
}

module.exports = ProudctCreateCardComponent;