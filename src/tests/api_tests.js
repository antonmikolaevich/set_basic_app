const {sendUserRequest} = require("./api_helpers/helpers");
const { expect } = require("chai");
const { newUser, newUserUpd, newProduct, newProductUpd, userBooking, productBooking, newBooking, newBookingUpd, bookstoreItem, bookstoreItemUpd} = require("../src/data/dataExample");
let createdUserId;
let createdProductId;
let createdBookstoreItemId;
let createdBookingId;


describe("Bookshop API CRUD tests", () => {
    describe("Users suite", () => {
        it.only("Create user - /api/users [POST]", async () => {
            const response = await sendUserRequest("users", newUser, "post");
            expect(response.status).to.equal(201);
            expect(response.data.user).to.have.property("_id");
            createdUserId = response.data.user._id;
        })

        it.only("Get user by ID - /api/users/:id [GET]", async () => {
            const response = await sendUserRequest(`users/${createdUserId}`);
            expect(response.status).to.equal(200);
            expect(response.data).to.have.property("_id", createdUserId);
            expect(response.data.name).to.equal(newUser.name);
            expect(response.data.email).to.equal(newUser.email);
            expect(response.data.phone).to.equal(newUser.phone);
            expect(response.data.address).to.equal(newUser.address);
            expect(response.data.login).to.equal(newUser.login);
            expect(response.data.role_id._id).to.equal(newUser.role_id);   
        })

        it.only('Get all users - /api/users [GET]', async () => {
            const response = await sendUserRequest("users");
            expect(response.status).to.equal(200);
            expect(response.data).to.be.an('array');
        })

        it.only("Update user by ID - /api/users/:id [PUT]", async () => {
            const response = await sendUserRequest(`users/${createdUserId}`, newUserUpd, "put");
            expect(response.status).to.equal(200);
        })

        it.only("Get updated user by ID - /api/users/:id [GET]", async () => {
            const response = await sendUserRequest(`users/${createdUserId}`);
            expect(response.status).to.equal(200);
            expect(response.data).to.have.property("_id", createdUserId);
            expect(response.data.name).to.equal(newUserUpd.name);
            expect(response.data.email).to.equal(newUserUpd.email);
            expect(response.data.phone).to.equal(newUserUpd.phone);
            expect(response.data.address).to.equal(newUserUpd.address);
            expect(response.data.login).to.equal(newUserUpd.login);
            expect(response.data.role_id._id).to.equal(newUserUpd.role_id);   
     })

        it.only("Delete user by ID - /api/users/:id [DELETE]", async () => {
            const response = await sendUserRequest(`users/${createdUserId}`, null, "delete");
            expect(response.status).to.equal(200);
        })

        it.only("Get deleted user by ID - /api/users/:id [GET]", async () => {
            const response = await sendUserRequest(`users/${createdUserId}`);
            expect(response.status).to.equal(404);
        })
    })

    describe("Products suite", () => {
        it("Create product - /api/products [POST]", async () => {
            const response = await sendUserRequest("products", newProduct, "post");
            expect(response.status).to.equal(201);
            expect(response.data.product).to.have.property("_id");
            createdProductId = response.data.product._id;
        })

        it("Get product by ID - /api/products/:id [GET]", async () => {
            const response = await sendUserRequest(`products/${createdProductId}`);
            expect(response.status).to.equal(200);
            expect(response.data).to.have.property("_id", createdProductId);
            expect(response.data.name).to.equal(newProduct.name);
            expect(response.data.description).to.equal(newProduct.description);
            expect(response.data.author).to.equal(newProduct.author);
            expect(response.data.price).to.equal(newProduct.price);
            expect(response.data.image_path).to.equal(newProduct.image_path);  
        })

        it('Get all products - /api/products [GET]', async () => {
            const response = await sendUserRequest("products");
            expect(response.status).to.equal(200);
            expect(response.data).to.be.an('array');
        })

        it("Update product by ID - /api/products/:id [PUT]", async () => {
            const response = await sendUserRequest(`products/${createdProductId}`, newProductUpd, "put");
            expect(response.status).to.equal(200);
        });

        it("Get updated product by ID - /api/products/:id [GET]", async () => {
            const response = await sendUserRequest(`products/${createdProductId}`);
            expect(response.status).to.equal(200);
            expect(response.data).to.have.property("_id", createdProductId);
            expect(response.data.name).to.equal(newProductUpd.name);
            expect(response.data.description).to.equal(newProductUpd.description);
            expect(response.data.author).to.equal(newProductUpd.author);
            expect(response.data.price).to.equal(newProductUpd.price);
            expect(response.data.image_path).to.equal(newProductUpd.image_path);  
        })

        it("Delete product by ID - /api/products/:id [DELETE]", async () => {
            const response = await sendUserRequest(`products/${createdProductId}`, null, "delete");
            expect(response.status).to.equal(200);
        });

        it("Get deleted product by ID - /api/products/:id [GET]", async () => {
            const response = await sendUserRequest(`products/${createdProductId}`);
            expect(response.status).to.equal(404);
        });

    })

    describe('Bookings suite', () => {
        it("Create the user for booking", async () => {
            const response = await sendUserRequest("users", userBooking, "post");
            expect(response.status).to.equal(201);
            expect(response.data.user).to.have.property("_id");
            createdUserId = response.data.user._id;
        })

        it("Create the product for booking", async () => {
            const response = await sendUserRequest("products", productBooking, "post");
            expect(response.status).to.equal(201);
            expect(response.data.product).to.have.property("_id");
            createdProductId = response.data.product._id;
        })

        it("Create booking - /api/bookings [POST]", async () => {
            const booking = {
                ...newBooking,
                user_id: createdUserId,
                product_id: createdProductId,
            };
            
            const response = await sendUserRequest("bookings", booking, "post");
            expect(response.status).to.equal(201);
            expect(response.data.booking).to.have.property("_id");
            createdBookingId = response.data.booking._id;
        })

        it("Get booking by ID - /api/bookings/:id [GET]", async () => {
            const response = await sendUserRequest(`bookings/${createdBookingId}`);
            expect(response.status).to.equal(200);
            expect(response.data).to.have.property("_id", createdBookingId);
            expect(response.data.user_id._id).to.equal(createdUserId);
            expect(response.data.product_id._id).to.equal(createdProductId);
            expect(response.data.delivery_address).to.equal(newBooking.delivery_address);
            expect(response.data.delivery_date).to.contain(newBooking.delivery_date);
            expect(response.data.status_id.name).to.equal(newBooking.status_id);
            expect(response.data.quantity).to.equal(newBooking.quantity);
        })  
        
        it('Get all bookings - /api/bookings [GET]', async () => {
            const response = await sendUserRequest("bookings");
            expect(response.status).to.equal(200);
            expect(response.data).to.be.an('array');    
        })

        it("Update booking by ID - /api/bookings/:id [PUT]", async () => {
            const bookingUpd = {
                ...newBookingUpd,
                user_id: createdUserId,
                product_id: createdProductId,
            };
            const response = await sendUserRequest(`bookings/${createdBookingId}`, bookingUpd, "put");
            expect(response.status).to.equal(200);
        });

        it("Get updated booking by ID - /api/bookings/:id [GET]", async () => {
            const response = await sendUserRequest(`bookings/${createdBookingId}`);
            expect(response.status).to.equal(200);
            expect(response.data).to.have.property("_id", createdBookingId);
            expect(response.data.user_id._id).to.equal(createdUserId);
            expect(response.data.product_id._id).to.equal(createdProductId);
            expect(response.data.delivery_address).to.equal(newBookingUpd.delivery_address);
            expect(response.data.status_id.name).to.equal(newBookingUpd.status_id);
            expect(response.data.quantity).to.equal(newBookingUpd.quantity);
        })
        
        it(`Delete booking by ID - /api/bookings/:id [DELETE]`, async () => {
            const response = await sendUserRequest(`bookings/${createdBookingId}`, null, "delete");
            expect(response.status).to.equal(200);
        });
        
        it("Get deleted booking by ID - /api/bookings/:id [GET]", async () => {
            const response = await sendUserRequest(`bookings/${createdBookingId}`);
            expect(response.status).to.equal(404);
        });

        it("Delete user by ID - /api/users/:id [DELETE]", async () => {
            const response = await sendUserRequest(`users/${createdUserId}`, null, "delete");
            expect(response.status).to.equal(200);
        })

        it("Get deleted user by ID - /api/users/:id [GET]", async () => {
            const response = await sendUserRequest(`users/${createdUserId}`);
            expect(response.status).to.equal(404);
        })

        it("Delete product by ID - /api/products/:id [DELETE]", async () => {
            const response = await sendUserRequest(`products/${createdProductId}`, null, "delete");
            expect(response.status).to.equal(200);
        });

        it("Get deleted product by ID - /api/products/:id [GET]", async () => {
            const response = await sendUserRequest(`products/${createdProductId}`);
            expect(response.status).to.equal(404);
        });
    })    

    describe("Bookstore suite", () => {
        it("Create product for bookstore checking - api/products [POST]", async () => {
            const response = await sendUserRequest("products", productBooking, "post");
            expect(response.status).to.equal(201);
            expect(response.data.product).to.have.property("_id");
            createdProductId = response.data.product._id;
        })

        it("Create bookstore item - /api/bookstore [POST]", async () => {
            const bookingItem = {
                ...bookstoreItem,
                product_id: createdProductId,
            };
            const response = await sendUserRequest("bookstore", bookingItem, "post");
            expect(response.status).to.equal(201);
            expect(response.data.bookStoreItem).to.have.property("_id");
            createdBookstoreItemId = response.data.bookStoreItem._id;
        })

        it("Get bookstore item by ID - /api/bookstore/:id [GET]", async () => {
            const response = await sendUserRequest(`bookstore/${createdBookstoreItemId}`);
            expect(response.status).to.equal(200);
            expect(response.data).to.have.property("_id", createdBookstoreItemId);
            expect(response.data.product_id._id).to.equal(createdProductId);
            expect(response.data.available_qty).to.equal(bookstoreItem.available_qty);
            expect(response.data.booked_qty).to.equal(bookstoreItem.booked_qty);
            expect(response.data.sold_qty).to.equal(bookstoreItem.sold_qty);
        })
        
        it('Get all bookstore items - /api/bookstore [GET]', async () => {
            const response = await sendUserRequest("bookstore");
            expect(response.status).to.equal(200);
            expect(response.data).to.be.an('array');    
        })

        it("Update bookstore item by ID - /api/bookstore/:id [PUT]", async () => {
            const bookingItemUpd = {
                ...bookstoreItemUpd,
                product_id: createdProductId,
            }
            const response = await sendUserRequest(`bookstore/${createdBookstoreItemId}`, bookingItemUpd, "put");
            expect(response.status).to.equal(200);
        })

        it("Get updated bookstore item by ID - /api/bookstore/:id [GET]", async () => {
            const response = await sendUserRequest(`bookstore/${createdBookstoreItemId}`);
            expect(response.status).to.equal(200);
            expect(response.data).to.have.property("_id", createdBookstoreItemId);
            expect(response.data.product_id._id).to.equal(createdProductId);
            expect(response.data.available_qty).to.equal(bookstoreItemUpd.available_qty);
            expect(response.data.booked_qty).to.equal(bookstoreItemUpd.booked_qty);
            expect(response.data.sold_qty).to.equal(bookstoreItemUpd.sold_qty);
        })

        it(`Delete bookstore item by ID - /api/bookstore/:id [DELETE]`, async () => {
            const response = await sendUserRequest(`bookstore/${createdBookstoreItemId}`, null, "delete");
            expect(response.status).to.equal(200);
        }); 

        it("Get deleted bookstore item by ID - /api/bookstore/:id [GET]", async () => {
            const response = await sendUserRequest(`bookstore/${createdBookstoreItemId}`);
            expect(response.status).to.equal(404);
        })

        it("Delete product by ID - /api/products/:id [DELETE]", async () => {
            const response = await sendUserRequest(`products/${createdProductId}`, null, "delete");
            expect(response.status).to.equal(200);
        })
    })
})   