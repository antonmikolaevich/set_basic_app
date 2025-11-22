const BaseComponent = require("../../common/base.component");

class SearchProductResultComponent extends BaseComponent {
    constructor(page){
        super('div#searchResult', page)
    }

    get name (){
        return this.rootEl.locator('h5');
    }

    get id (){
        return this.rootEl.locator('p:nth-child(2)');
    }

    get author (){
        return this.rootEl.locator('p:nth-child(3)');
    }

    get price (){
        return this.rootEl.locator('p:nth-child(4)');
    }  

    get description (){
        return this.rootEl.locator('p:nth-child(5)');
    }

}

module.exports = SearchProductResultComponent;