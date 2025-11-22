class BaseComponent {

    constructor(rootSelector, page){
        this.rootSelector = rootSelector;
        this.page = page;
    }

    get rootEl(){
        return this.page.locator(this.rootSelector);
    }
}

module.exports = BaseComponent;