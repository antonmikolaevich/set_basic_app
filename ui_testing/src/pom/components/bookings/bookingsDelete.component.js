const BaseComponent = require("../../common/base.component");

class BookingsDeleteComponent extends BaseComponent {
        constructor(page){
            super('div#deleteBookingModal', page)
        }

        get title(){
            return this.rootEl.locator('div.modal-header h5.modal-title')
        }

        get closeBtn(){
            return this.rootEl.locator('div.modal-header button.btn-close')
        }

        get textMessage(){
            return this.rootEl.locator('div.modal-content div.modal-body p')
        }

        get cancelBtn(){
            return this.rootEl.locator('div.modal-footer button.btn-secondary')
        }

        get deleteBtn(){
            return this.rootEl.locator('div.modal-footer button.btn-danger')
        }
}

module.exports = BookingsDeleteComponent;