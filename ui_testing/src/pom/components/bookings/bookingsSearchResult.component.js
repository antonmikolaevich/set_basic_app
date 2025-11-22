const BaseComponent = require("../../common/base.component");

class SearchBookingsResultComponent extends BaseComponent {
    constructor(page){
        super('div#searchBookingResult', page)
    }

    get booking_id (){
        return this.rootEl.locator('p:nth-child(1)');
    }

    get productName (){
        return this.rootEl.locator('p:nth-child(2)');
    }

    get deliveryAddress (){
        return this.rootEl.locator('p:nth-child(3)');
    }

    get deliveryTime (){
        return this.rootEl.locator('p:nth-child(4)');
    }  

    get status (){
        return this.rootEl.locator('p:nth-child(5)');
    }

     get quantity (){
        return this.rootEl.locator('p:nth-child(6)');
    }

}

module.exports = SearchBookingsResultComponent;