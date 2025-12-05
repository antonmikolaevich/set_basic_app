const BaseComponent = require("../../common/base.component");

class SearchBookstoreResultComponent extends BaseComponent {
    constructor(page){
        super('div#searchStoreResult', page)
    }

    get id (){
        return this.rootEl.locator('p:nth-child(1)');
    }

    get productName (){
        return this.rootEl.locator('p:nth-child(2)');
    }

    get description (){
        return this.rootEl.locator('p:nth-child(3)');
    }

    get author (){
        return this.rootEl.locator('p:nth-child(4)');
    }  

    get price (){
        return this.rootEl.locator('p:nth-child(5)');
    }

     get availableQuantity (){
        return this.rootEl.locator('p:nth-child(6)');
    }

     get bookedQuantity (){
        return this.rootEl.locator('p:nth-child(7)');
    }

    get soldQuantity (){
        return this.rootEl.locator('p:nth-child(8)');
    }

}

module.exports = SearchBookstoreResultComponent;