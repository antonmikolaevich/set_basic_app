const BaseComponent = require("../../common/base.component");

class SearchUserResultComponent extends BaseComponent {
    constructor(page){
        super('div#searchUserResult', page)
    }

    get userId (){
        return this.rootEl.locator('p:nth-child(1)');
    }

    get name (){
        return this.rootEl.locator('p:nth-child(2)');
    }

    get email (){
        return this.rootEl.locator('p:nth-child(3)');
    }  

    get phone (){
        return this.rootEl.locator('p:nth-child(4)');
    }

    get address (){
        return this.rootEl.locator('p:nth-child(5)');
    }

    get login (){
        return this.rootEl.locator('p:nth-child(6)');
    }

}

module.exports = SearchUserResultComponent;