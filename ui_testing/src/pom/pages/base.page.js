const HeaderComponent = require('../common/header.component');

class BasePage {
    constructor(page, url){
        this.page = page;
        this.url = url;
        this.headerComponent = new HeaderComponent(this.page);
    }

    async open() {
        await this.page.goto(this.url);
    }

}

module.exports = BasePage;