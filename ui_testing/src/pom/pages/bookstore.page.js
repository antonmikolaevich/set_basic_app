const BookstoreSearchComponent = require('../components/bookstore/bookstoreSearch.component');
const BookstoreResultsComponent = require('../components/bookstore/bookstoreResults.component');
const BookstoreCardComponent = require('../components/bookstore/bookstoreCard.component');
const Pagination = require('../common/pagination.component');
const EditBookstoreComponent = require('../components/bookstore/bookstoreEdit.component');
const BookstoreDeleteComponent = require('../components/bookstore/bookstoreDelete.component');
const SearchBookstoreResultComponent = require('../components/bookstore/bookstoreSearchResult.component');
const BookstoreCreateCardComponent = require('../components/bookstore/bookstoreCreateCard.component');
const BasePage = require('./base.page');

class BookstorePage extends BasePage {
  constructor(page) {
    super(page, '/bookstore');

    this.search = new BookstoreSearchComponent(page);
    this.results = new BookstoreResultsComponent(page);
    this.pagination = new Pagination(page);
    this.editBookstoreForm = new EditBookstoreComponent(page);
    this.deleteBookstoreForm = new BookstoreDeleteComponent(page); 
    this.bookstoreCard = new BookstoreCardComponent(page); 
    this.searchBookstoreResult = new SearchBookstoreResultComponent(page);
    this.createBookstoreForm = new BookstoreCreateCardComponent(page);
  }

    getBookstoresCard(index) {
        return new BookstoreCardComponent(this.page, index);
    }

    async getBookstoresCardsCount(){
        const cardComponent = new BookstoreCardComponent(this.page);
        return await cardComponent.getBookstoresCard();
    }
  
}

module.exports = BookstorePage;
