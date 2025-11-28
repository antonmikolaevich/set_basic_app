const BookingsSearchComponent = require('../components/bookings/bookingsSearch.component');
const BookingsResultsComponent = require('../components/bookings/bookingsResults.component');
const BookingsCardComponent = require('../components/bookings/bookingsCard.component');
const Pagination = require('../common/pagination.component');
const EditBookingsComponent = require('../components/bookings/bookingsEdit.component');
const BookingsDeleteComponent = require('../components/bookings/bookingsDelete.component');
const SearchBookingsResultComponent = require('../components/bookings/bookingsSearchResult.component');
const BookingsCreateCardComponent = require('../components/bookings/bookingsCreateCard.component');
const BookingsButtonsComponent = require('../components/bookings/bookingsButtons.component');
const ActiveBookingComponent = require('../components/bookings/activeBooking.component');
const BasePage = require('./base.page');

class BookingsPage extends BasePage {
  constructor(page) {
    super(page, '/bookings');

    this.search = new BookingsSearchComponent(page);
    this.results = new BookingsResultsComponent(page);
    this.pagination = new Pagination(page);
    this.editBookingForm = new EditBookingsComponent(page);
    this.deleteBookingForm = new BookingsDeleteComponent(page); 
    this.bookingsCard = new BookingsCardComponent(page); 
    this.searchBookingResult = new SearchBookingsResultComponent(page);
    this.createBookingForm = new BookingsCreateCardComponent(page);
    this.bookingsButtons = new BookingsButtonsComponent(page);
    this.activeBooking = new ActiveBookingComponent(page);
  }

    getBookingsCard(index) {
        return new BookingsCardComponent(this.page, index);
    }

    async getBookingsCardsCount(){
        const cardComponent = new BookingsCardComponent(this.page);
        return await cardComponent.getBookingsCard();
    }
  
}

module.exports = BookingsPage;
