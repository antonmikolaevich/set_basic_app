const BaseComponent = require('./base.component');


class Pagination extends BaseComponent {
    constructor(page) {
        super('ul.pagination', page);
    }

    get pages(){
        return this.rootEl.locator('li.page-item');
    }

    get prevButton(){
        return this.pages.first();
    }


    get nextButton(){
        return this.pages.last();
    }


    async clickPageByIndex(index){
        const allPages = await this.pages.all();
        const indexPage = index + 1;
        return allPages[indexPage].click();
    }

    async getPagesCount(){
        const allPages = await this.pages.all();
        return allPages.length - 2;
    }
}

module.exports = Pagination;