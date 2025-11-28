const BaseComponent = require("../../common/base.component");

class ActiveUsersComponent extends BaseComponent {
  constructor(page) {
    super(`#usersTableBody tr.user-row.visible`, page);
  }

  // Grab a specific row by index
  row(index) {
    return new RowWrapper(this.rootEl.nth(index));
  }
}

class RowWrapper {
  constructor(rowLocator) {
    this.rowEl = rowLocator;
  }

  get id() {
    return this.rowEl.locator('td:nth-child(1)');
  }

  get name() {
    return this.rowEl.locator('td:nth-child(2)');
  }

  get login() {
    return this.rowEl.locator('td:nth-child(3)');
  }

  get email() {
    return this.rowEl.locator('td:nth-child(4)');
  }

  get address() {
    return this.rowEl.locator('td:nth-child(5)');
  }
}

module.exports = ActiveUsersComponent;
