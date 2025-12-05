const { expect } = require('@playwright/test');
const { test } = require('../pom/pages/index.js');
// const { getFieldValue } = require('../functions/helpers.js');
const { updatedUser, newProduct, /* newBooking, */ newBookstore } = require('../data/users.js');

test.describe('UI part testing', async () => {
  
    test.describe('Users page', async () => {
        test.beforeEach(async ({ userPage }) => {
        await userPage.open()
});

       test('Scenario 1 - Verify that the create user works correctly - create the user', async ({ userPage, page: _page }) => {
            await userPage.results.rootEl.isVisible();
            await userPage.usersButtons.createButton.click();
            await userPage.createUserForm.rootEl.isVisible();
            await userPage.createUserForm.nameInput.fill(updatedUser.name);
            await userPage.createUserForm.emailInput.fill(updatedUser.email);
            await userPage.createUserForm.phoneInput.fill(updatedUser.phone);
            await userPage.createUserForm.addressInput.fill(updatedUser.address);
            await userPage.createUserForm.loginInput.fill(updatedUser.login);
            await userPage.createUserForm.roleIdInput.click();
            await userPage.createUserForm.roleIdInput.type(updatedUser.role_id);
            await userPage.createUserForm.createBtn.click();

            expect(await userPage.getUserCard(3).name.textContent()).toContain(updatedUser.name);
            expect(await userPage.getUserCard(3).login.textContent()).toContain(updatedUser.login);
            expect(await userPage.getUserCard(3).email.textContent()).toContain(updatedUser.email);
            expect(await userPage.getUserCard(3).address.textContent()).toContain(updatedUser.address);
        }) 
        
        test('Scenario 2 - Verify that the search user card is displayed correctly - search id user', async ({ userPage, page: _page }) => {
            await userPage.search.rootEl.isVisible();
            await userPage.getUserCard(3).id.isVisible();
            const userIdText = await userPage.getUserCard(3).id.textContent();
            await userPage.search.userId.fill(userIdText);
            await userPage.search.searchButton.click();
            expect(await userPage.activeRows.row(0).id.textContent()).toContain(userIdText);
        })

        test('Scenario 3 - Verify that the changed data (only userName here) into edit form is saved correctly - edit user', async ({ userPage, page }) => {
            await userPage.getUserCard(3).id.isVisible();
            const oldName = await userPage.getUserCard(3).name.textContent();
            await userPage.getUserCard(3).id.click();
            await page.waitForTimeout(3000);
            await userPage.usersButtons.editButton.click();
            await userPage.editUserForm.rootEl.isVisible();
            await userPage.editUserForm.nameInput.fill('Nico Paz');
            await userPage.editUserForm.updateBtn.click();
            await userPage.getUserCard(3).id.isVisible();
            const newName = await userPage.getUserCard(3).name.textContent();
            expect(oldName).not.toEqual(newName);
            expect(newName).toContain('Nico Paz');
        })

        test('Scenario 4 - Verify that the delete user works correctly - delete user', async ({ userPage, page }) => {
            await userPage.getUserCard(3).id.isVisible();
            const userIdText = await userPage.getUserCard(3).id.textContent();
            await userPage.getUserCard(3).id.click();
            await page.waitForTimeout(3000);
            await userPage.usersButtons.deleteButton.click();
            await userPage.deleteUserForm.rootEl.isVisible();
            await userPage.deleteUserForm.deleteBtn.click();
            await expect(await userPage.deleteUserForm.rootEl).not.toBeVisible();
            await userPage.search.userId.fill(userIdText);
            await userPage.search.searchButton.click();
            await userPage.searchUserResult.alert.isVisible();
            const errorMessageText = await userPage.searchUserResult.alert.textContent();
            expect(errorMessageText).toContain('No users found');
        })    

    })

    test.describe('Products page', async () => {
        test.beforeEach(async ({ productsPage }) => {
        await productsPage.open();
        })

        test('Scenario 5 - Verify that the create product works correctly - create the product', async ({ productsPage, page: _page }) => {
            await productsPage.productButtons.rootEl.isVisible();
            await productsPage.productButtons.createButton.click();
            await productsPage.createProductForm.rootEl.isVisible();
            await productsPage.createProductForm.nameInput.fill(newProduct.name);
            await productsPage.createProductForm.descriptionInput.fill(newProduct.description);
            await productsPage.createProductForm.authorInput.fill(newProduct.author);
            await productsPage.createProductForm.priceInput.fill(newProduct.price);
            await productsPage.createProductForm.imagePathInput.fill(newProduct.image);
            await productsPage.createProductForm.createBtn.click();

            expect(await productsPage.getProductsCard(6).name.textContent()).toContain(newProduct.name);
            expect(await productsPage.getProductsCard(6).author.textContent()).toContain(newProduct.author);
            expect(await productsPage.getProductsCard(6).description.textContent()).toContain(newProduct.description);
            expect(await productsPage.getProductsCard(6).price.textContent()).toContain(newProduct.price);
    })    
    
        test('Scenario 6 - Verify that the search product card is displayed correctly - search id product', async ({ productsPage, page: _page }) => {
            await productsPage.productButtons.rootEl.isVisible();
            await productsPage.getProductsCard(6).id.isVisible();
            const productAuthor = await productsPage.getProductsCard(6).author.textContent();
     
            await productsPage.search.author.fill(productAuthor);
            await productsPage.search.searchButton.click();
            const searchResulttext = await productsPage.activeProduct.card(0).author.textContent();
            expect(searchResulttext).toContain(productAuthor);
        })  
        
        test('Scenario 7 - Verify that the changed data (only userName here) into edit form is saved correctly - edit user', async ({ productsPage, page: _page }) => {
            await productsPage.getProductsCard(6).id.isVisible();
            const oldName = await productsPage.getProductsCard(6).name.textContent();
            await productsPage.getProductsCard(6).editBtn.click();
            await productsPage.editProductForm.rootEl.isVisible();
            await productsPage.editProductForm.nameInput.fill('1984');
            await productsPage.editProductForm.updateBtn.click();
            await productsPage.getProductsCard(6).id.isVisible();
            const newName = await productsPage.getProductsCard(6).name.textContent();
            expect(oldName).not.toEqual(newName);
            expect(newName).toContain('1984');
        })

        test('Scenario 8 - Verify that the delete product works correctly - delete product', async ({ productsPage, page }) => {
            await productsPage.getProductsCard(6).id.isVisible();
            const productIdText = await productsPage.getProductsCard(6).id.textContent();
            await productsPage.getProductsCard(6).deleteBtn.click();
            await page.waitForTimeout(2000);
            await productsPage.deleteProductForm.rootEl.isVisible();
            await productsPage.deleteProductForm.deleteBtn.click();
            await expect(await productsPage.deleteProductForm.rootEl).not.toBeVisible();
            await productsPage.search.productId.fill(productIdText);
            await productsPage.search.searchButton.click();
            await productsPage.searchProductResult.alert.isVisible();
            const errorMessageText = await productsPage.searchProductResult.alert.textContent();
            expect(errorMessageText).toContain('No products found');
        })
    })

    test.describe('Bookings page', async () => {
        test.beforeEach(async ({ bookingsPage }) => {
        await bookingsPage.open();
        })

        // test('Scenario 9 - Verify that the create booking works correctly - create the booking', async ({ bookingsPage, page, productsPage, userPage }) => {
        //     await userPage.open();
        //     const userIdText = await userPage.getUserCard(1).id.textContent();
        //     await productsPage.open();
        //     const productIdText = await productsPage.getProductsCard(1).id.textContent();
        //     await bookingsPage.open();
        //     await bookingsPage.results.rootEl.isVisible();
        //     await bookingsPage.bookingsButtons.createButton.click();
        //     await bookingsPage.createBookingForm.rootEl.isVisible();
        //     await bookingsPage.createBookingForm.product_id.fill(productIdText);
        //     await bookingsPage.createBookingForm.user_id.fill(userIdText);
        //     await bookingsPage.createBookingForm.deliveryAddress.fill(newBooking.delivery_address);
        //     await bookingsPage.createBookingForm.deliveryDate.click();
        //     await bookingsPage.createBookingForm.deliveryDate.type(newBooking.delivery_date);
        //     await bookingsPage.createBookingForm.deliveryTime.click();


        //     await bookingsPage.createBookingForm.deliveryTime.type(newBooking.delivery_time);
        //     await bookingsPage.createBookingForm.quantity.fill(newBooking.quantity);
        //     await bookingsPage.createBookingForm.createBtn.click();

        //     expect(await bookingsPage.getBookingsCard(3).deliveryAddress.textContent()).toContain(newBooking.delivery_address);
        //     expect(await bookingsPage.getBookingsCard(3).quantity.textContent()).toContain(newBooking.quantity);
        // })

        test('Scenario 9 - Verify that the search booking card is displayed correctly - search id booking', async ({ bookingsPage, page }) => {
            await bookingsPage.search.rootEl.isVisible();
            await bookingsPage.getBookingsCard(3).productName.isVisible();
            const productName = await bookingsPage.getBookingsCard(3).productName.textContent();
            await bookingsPage.search.productName.fill(productName);
            await bookingsPage.search.searchButton.click();
            await page.waitForTimeout(500);
            const searchResulttext = await bookingsPage.activeBooking.card(0).productName.textContent();
            expect(searchResulttext).toContain(productName);
        })


        test('Scenario 10 - Verify that the booking card status is changed correctly', async ({ bookingsPage, page }) => {
            await bookingsPage.getBookingsCard(1).approveButton.isVisible();
            await bookingsPage.getBookingsCard(1).approveButton.click();
            await page.waitForTimeout(1000);
            expect(await bookingsPage.getBookingsCard(1).status.textContent()).toContain('APPROVED');
            await bookingsPage.getBookingsCard(1).rejectButton.isVisible();
            await bookingsPage.getBookingsCard(1).rejectButton.click();
            await page.waitForTimeout(1000);
            expect(await bookingsPage.getBookingsCard(1).status.textContent()).toContain('REJECTED');
            await bookingsPage.getBookingsCard(1).closeButton.isVisible();
            await bookingsPage.getBookingsCard(1).closeButton.click();
            await page.waitForTimeout(1000);
            expect(await bookingsPage.getBookingsCard(1).status.textContent()).toContain('CLOSED');
        })

        // test('Scenario 11 - Verify that the changed data (only deliveryAddress here) into edit form is saved correctly - edit booking', async ({ bookingsPage, page }) => {
        //     await bookingsPage.getBookingsCard(3).id.isVisible();
        //     const oldAddress = await bookingsPage.getBookingsCard(3).deliveryAddress.textContent();
        //     await bookingsPage.getBookingsCard(3).editBtn.click();
        //     await bookingsPage.editBookingForm.rootEl.isVisible();
        //     await bookingsPage.editBookingForm.deliveryAddress.fill('456 New St, Newcity, USA');
        //     await bookingsPage.editBookingForm.updateBtn.click();
        //     await bookingsPage.getBookingsCard(3).id.isVisible();
        //     const newAddress = await bookingsPage.getBookingsCard(3).deliveryAddress.textContent();
        //     expect(oldAddress).not.toEqual(newAddress);
        //     expect(newAddress).toContain('456 New St, Newcity, USA');
        // })


        // test('Scenario 12 - Verify that the delete booking works correctly - delete booking', async ({ bookingsPage, page }) => {
        //     await bookingsPage.getBookingsCard(3).id.isVisible();
        //     const bookingIdText = await bookingsPage.getBookingsCard(3).id.textContent();
        //     const bookingId = getFieldValue(bookingIdText, 'Booking ID');
        //     await bookingsPage.getBookingsCard(3).deleteBtn.click();
        //     await bookingsPage.deleteBookingForm.rootEl.isVisible();
        //     await bookingsPage.deleteBookingForm.deleteBtn.click();
        //     await expect(await bookingsPage.deleteBookingForm.rootEl).not.toBeVisible();
        //     await bookingsPage.search.searchInput.fill(bookingId);
        //     await bookingsPage.search.searchButton.click();
        //     await bookingsPage.search.errorMessage.isVisible();
        //     const errorMessageText = await bookingsPage.search.errorMessage.textContent();
        //     expect(errorMessageText).toContain('Booking not found');
        // })
    })

        test.describe('Bookstore page', async () => {
        test.beforeEach(async ({ bookstorePage }) => {
        await bookstorePage.open();
            })

        test('Scenario 11 - Verify that the create bookstore works correctly - create the bookstore', async ({ bookstorePage, page: _page, productsPage: _productsPage}) => {
            await bookstorePage.open();
            await bookstorePage.bookstoreButtons.rootEl.isVisible();
            await bookstorePage.bookstoreButtons.createButton.click();
            await bookstorePage.createBookstoreForm.rootEl.isVisible();
            await bookstorePage.createBookstoreForm.productId.fill(newBookstore.product_id);
            await bookstorePage.createBookstoreForm.availableQuantity.fill(newBookstore.available_quantity);
            await bookstorePage.createBookstoreForm.bookedQuantity.fill(newBookstore.booked_quantity);
            await bookstorePage.createBookstoreForm.soldQuantity.fill(newBookstore.sold_quantity);
            await bookstorePage.createBookstoreForm.createBtn.click();

            expect(await bookstorePage.getBookstoresCard(3).id.textContent()).toContain(newBookstore.product_id);
            expect(await bookstorePage.getBookstoresCard(3).productName.textContent()).toContain('Night Manager');
            expect(await bookstorePage.getBookstoresCard(3).available_qty.textContent()).toContain(newBookstore.available_quantity);
            expect(await bookstorePage.getBookstoresCard(3).booked_qty.textContent()).toContain(newBookstore.booked_quantity);
            expect(await bookstorePage.getBookstoresCard(3).delivered_qty.textContent()).toContain(newBookstore.sold_quantity);
        })

        test('Scenario 12 - Verify that the search bookstore card is displayed correctly - search id bookstore', async ({ bookstorePage, page }) => {
            await bookstorePage.search.rootEl.isVisible();
            await bookstorePage.getBookstoresCard(3).id.isVisible();
            const bookstoreId = await bookstorePage.getBookstoresCard(3).id.textContent();

            await bookstorePage.search.productId.fill(bookstoreId);
            await bookstorePage.search.searchButton.click();
            await page.waitForTimeout(500);
            const searchResulttext = await bookstorePage.activeBookstore.row(0).id.textContent();
            expect(searchResulttext).toContain(bookstoreId);
        })

        test('Scenario 13 - Verify that the changed data (only availableQuantity here) into edit form is saved correctly - edit bookstore', async ({ bookstorePage, page }) => {
            await bookstorePage.getBookstoresCard(3).id.isVisible();
            const oldAvailableQuantity = await bookstorePage.getBookstoresCard(3).available_qty.textContent();
            await bookstorePage.getBookstoresCard(3).id.click();
            await page.waitForTimeout(500);
            await bookstorePage.bookstoreButtons.editButton.click();
            await bookstorePage.editBookstoreForm.rootEl.isVisible();
            await bookstorePage.editBookstoreForm.availableQuantity.fill('50');
            await bookstorePage.editBookstoreForm.updateBtn.click();
            await bookstorePage.getBookstoresCard(3).id.isVisible();
            const newAvailableQuantity = await bookstorePage.getBookstoresCard(3).available_qty.textContent();
            expect(oldAvailableQuantity).not.toEqual(newAvailableQuantity);
            expect(newAvailableQuantity).toContain('50');
        })

        test('Scenario 14 - Verify that the delete bookstore works correctly - delete bookstore', async ({ bookstorePage, page }) => {
            await bookstorePage.getBookstoresCard(3).id.isVisible();
            const bookstoreId = await bookstorePage.getBookstoresCard(3).id.textContent();
            await bookstorePage.getBookstoresCard(3).id.click();
            await page.waitForTimeout(500);
            await bookstorePage.bookstoreButtons.deleteButton.click();
            await bookstorePage.deleteBookstoreForm.rootEl.isVisible();
            await bookstorePage.deleteBookstoreForm.deleteBtn.click();
            await page.waitForTimeout(2000);
            await expect(await bookstorePage.deleteBookstoreForm.rootEl).not.toBeVisible();
            await bookstorePage.search.productId.fill(bookstoreId);
            await bookstorePage.search.searchButton.click();
            await bookstorePage.search.errorMessage.isVisible();
            const errorMessageText = await bookstorePage.search.errorMessage.textContent();
            expect(errorMessageText).toContain('No bookstore items found');
        })  

    })

})