const { test: baseTest } = require("@playwright/test");
const UserPage = require("./users.page");
const ProductsPage = require("./products.page");
const BookingsPage = require("./bookings.page");
const BookstorePage = require("./bookstore.page")

const test = baseTest.extend({
  userPage: async ({ page }, use) => {
    await use(new UserPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  bookingsPage: async ({ page }, use) => {
    await use(new BookingsPage(page));
  },
  bookstorePage: async ({ page }, use) => {
    await use(new BookstorePage(page));
  }
});

module.exports = { test };