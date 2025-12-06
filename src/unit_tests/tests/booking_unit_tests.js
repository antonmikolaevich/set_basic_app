const bookingController = require('../../controllers/bookingController');
const Booking = require('../../models/Booking');
const Product = require('../../models/Products');
const BookingStatus = require('../../models/BookingStatus');
const User = require('../../models/User');

jest.mock('../../models/Booking');
jest.mock('../../models/Products');
jest.mock('../../models/BookingStatus');
jest.mock('../../models/User');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

let req;
let res;

describe('Booking Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ---------- CREATE BOOKING ----------
  describe('createBooking', () => {
    it('should return 400 if required fields missing', async () => {
      const req = { body: {} };
      const res = mockRes();

      await bookingController.createBooking(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should handle unexpected server error during booking creation', async () => {
  const req = {
    body: {
      user_id: 'u1',
      product_id: 'p1',
      delivery_address: '123 Street',
      delivery_date: '2025-11-10',
      delivery_time: '10:00',
      status_id: 's1',
      quantity: 1
    }
  };
  const res = mockRes();

  // All mocks resolve normally until saving
  User.findById.mockResolvedValue({ _id: 'u1' });
  Product.findById.mockResolvedValue({ _id: 'p1' });
  BookingStatus.findOne.mockResolvedValue({ _id: 's1' });

  // Simulate a crash when saving (e.g., DB failure)
  Booking.prototype.save = jest.fn().mockRejectedValue(new Error('DB crash'));

  await bookingController.createBooking(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      message: 'Error creating booking',
    })
  );
});


    it('should return 404 if user not found', async () => {
      const req = { body: {
        user_id: 'u1', product_id: 'p1', delivery_address: 'addr',
        delivery_date: '2025-11-10', delivery_time: '10:00', status_id: 's1', quantity: 1
      }};
      const res = mockRes();

      User.findById.mockResolvedValue(null);
      await bookingController.createBooking(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should return 400 if delivery_time format is invalid but date is valid', async () => {
  const req = {
    body: {
      user_id: 'u1',
      product_id: 'p1',
      delivery_address: '123 Street',
      delivery_date: '2025-11-10', // valid date
      delivery_time: '99:99',      // invalid time (triggers line 50)
      status_id: 's1',
      quantity: 1
    }
  };
  const res = mockRes();

  // Mock model responses to pass earlier checks
  User.findById.mockResolvedValue({ _id: 'u1' });
  Product.findById.mockResolvedValue({ _id: 'p1' });
  BookingStatus.findOne.mockResolvedValue({ _id: 's1' });

  await bookingController.createBooking(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      message:
        'Invalid date/time format. Please use YYYY-MM-DD for delivery_date (e.g., "2025-11-10") and HH:MM for delivery_time (e.g., "19:00")',
    })
  );
});

    it('should return 404 if product not found', async () => {
      const req = { body: {
        user_id: 'u1', product_id: 'p1', delivery_address: 'addr',
        delivery_date: '2025-11-10', delivery_time: '10:00', status_id: 's1', quantity: 1
      }};
      const res = mockRes();

      User.findById.mockResolvedValue({ _id: 'u1' });
      Product.findById.mockResolvedValue(null);
      await bookingController.createBooking(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should use BookingStatus.findById when status_id length is 24', async () => {
      const req = { body: {
        user_id: 'u1', product_id: 'p1', delivery_address: 'addr',
        delivery_date: '2025-11-10', delivery_time: '10:00',
        status_id: '123456789012345678901234', quantity: 1
      }};
      const res = mockRes();

      User.findById.mockResolvedValue({ _id: 'u1' });
      Product.findById.mockResolvedValue({ _id: 'p1' });
      BookingStatus.findById.mockResolvedValue(null);

      await bookingController.createBooking(req, res);
      expect(BookingStatus.findById).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should return 400 for invalid date/time formats', async () => {
      const req = { body: {
        user_id: 'u1', product_id: 'p1', delivery_address: 'addr',
        delivery_date: 'invalid', delivery_time: '25:00',
        status_id: 's1', quantity: 1
      }};
      const res = mockRes();

      User.findById.mockResolvedValue({ _id: 'u1' });
      Product.findById.mockResolvedValue({ _id: 'p1' });
      BookingStatus.findOne.mockResolvedValue({ _id: 's1' });

      await bookingController.createBooking(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should successfully create booking (valid date/time)', async () => {
      const req = { body: {
        user_id: 'u1', product_id: 'p1', delivery_address: 'addr',
        delivery_date: '2025-11-10', delivery_time: '12:00',
        status_id: 'pending', quantity: 3
      }};
      const res = mockRes();

      User.findById.mockResolvedValue({ _id: 'u1' });
      Product.findById.mockResolvedValue({ _id: 'p1' });
      BookingStatus.findOne.mockResolvedValue({ _id: 's1' });
      Booking.prototype.save = jest.fn().mockResolvedValue();

      await bookingController.createBooking(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(Booking.prototype.save).toHaveBeenCalled();
    });

    it('should handle internal error gracefully', async () => {
      const req = { 
        body: { 
          user_id: '1',
          product_id: '2', 
          delivery_address: 'Test Address', 
          delivery_date: '2025-11-10', 
          delivery_time: '19:00', 
          status_id: 'pending', 
          quantity: 1 
        } 
      };
      const res = mockRes();

      User.findById.mockRejectedValue(new Error('DB error'));
      await bookingController.createBooking(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  // ---------- GET BOOKINGS ----------
  describe('getBookings', () => {
   it('should return all bookings', async () => {
  const req = { query: {} };
  const res = mockRes();

  const mockBookings = [{ id: 1 }];

  // Mock countDocuments and the chain: find().populate().populate().populate().skip().limit()
  Booking.countDocuments = jest.fn().mockResolvedValue(10);
  Booking.find = jest.fn().mockReturnValue({
    populate: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue(mockBookings)
          })
        })
      })
    })
  });

  await bookingController.getBookings(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    bookings: mockBookings,
    page: 1,
    totalPages: 4
  });
});


    it('should handle database error', async () => {
      const req = { query: {} }, res = mockRes();
      Booking.find.mockImplementation(() => { throw new Error('err'); });
      await bookingController.getBookings(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should return 200 and list of bookings successfully', async () => {
  const req = { query: {} };
  const res = mockRes();

  const mockResolvedBookings = [{ _id: 'b1', user_id: 'u1' }];

  // Mock countDocuments and the chain: find().populate().populate().populate().skip().limit()
  Booking.countDocuments = jest.fn().mockResolvedValue(10);
  Booking.find = jest.fn().mockReturnValue({
    populate: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue(mockResolvedBookings)
          })
        })
      })
    })
  });

  await bookingController.getBookings(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    bookings: expect.arrayContaining([
      expect.objectContaining({ _id: 'b1' })
    ]),
    page: 1,
    totalPages: 4
  });
});
  });

  // ---------- GET BOOKING ----------
  describe('getBooking', () => {
   it('should return single booking', async () => {
  const req = { params: { id: '1' } };
  const res = mockRes();

  const mockBooking = { _id: '1' };

  // Build a proper mock populate chain
  const populateChain = { populate: jest.fn().mockReturnThis() };
  populateChain.populate
    .mockReturnValueOnce(populateChain) // 1st populate
    .mockReturnValueOnce(populateChain) // 2nd populate
    .mockReturnValueOnce(Promise.resolve(mockBooking)); // 3rd populate resolves

  // Make Booking.findById return the chain
  Booking.findById.mockReturnValue(populateChain);

  await bookingController.getBooking(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(mockBooking);
});


   it('should return 404 if not found', async () => {
  const req = { params: { id: '1' } };
  const res = mockRes();

  // Create a populate chain
  const populateChain = { populate: jest.fn().mockReturnThis() };
  populateChain.populate
    .mockReturnValueOnce(populateChain) // first populate()
    .mockReturnValueOnce(populateChain) // second populate()
    .mockReturnValueOnce(Promise.resolve(null)); // final populate() resolves to null (not found)

  // Mock Booking.findById to return that chain
  Booking.findById.mockReturnValue(populateChain);

  await bookingController.getBooking(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({ message: 'Booking not found' })
  );
});


    it('should handle error', async () => {
      const req = { params: { id: '1' } }, res = mockRes();
      Booking.findById.mockImplementation(() => { throw new Error('err'); });
      await bookingController.getBooking(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });

    it('should return 200 and the booking when found', async () => {
    const req = { params: { id: 'b1' } };
    const res = mockRes();

    // Mock populate chain correctly to return a booking
    const mockPopulate = jest.fn().mockReturnThis();
    const mockBooking = { _id: 'b1', user_id: 'u1' };

    Booking.findById.mockReturnValue({
      populate: mockPopulate,
      then: (resolve) => resolve(mockBooking) // resolves to booking object
    });

    await bookingController.getBooking(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ _id: 'b1' }));
  });

  it('should return 404 if booking not found', async () => {
    const req = { params: { id: 'b2' } };
    const res = mockRes();

    Booking.findById.mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      then: (resolve) => resolve(null) // resolves to null
    });

    await bookingController.getBooking(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Booking not found' }));
  });
  });

  // ---------- UPDATE BOOKING ----------
  describe('updateBooking', () => {

   it('should update user_id when user exists', async () => {
  const req = {
    params: { id: 'b1' },
    body: { user_id: 'u1' }
  };
  const res = mockRes();

  // Mock User.findById to return a user
  User.findById.mockResolvedValue({ _id: 'u1', name: 'John' });

  // Mock the booking that will be "returned"
  const mockBooking = { _id: 'b1', user_id: 'u1' };

  // Build a mock populate chain
  const populateChain = {
    populate: jest.fn().mockReturnThis()
  };
  populateChain.populate
    .mockReturnValueOnce(populateChain)
    .mockReturnValueOnce(populateChain)
    .mockReturnValueOnce(Promise.resolve(mockBooking));

  // Make Booking.findByIdAndUpdate return the chain
  Booking.findByIdAndUpdate.mockReturnValue(populateChain);

  await bookingController.updateBooking(req, res);

  expect(User.findById).toHaveBeenCalledWith('u1');
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      message: 'Booking updated successfully',
      booking: mockBooking
    })
  );
});


  it('should return 404 if user does not exist', async () => {
    const req = {
      params: { id: 'b1' },
      body: { user_id: 'u2' }
    };
    const res = mockRes();

    User.findById.mockResolvedValue(null);

    await bookingController.updateBooking(req, res);

    expect(User.findById).toHaveBeenCalledWith('u2');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
  });

    it('should update product_id when product exists', async () => {
  const req = {
    params: { id: 'b1' },
    body: { product_id: 'p1' }
  };
  const res = mockRes();

  // Mock Product.findById to return a product
  Product.findById.mockResolvedValue({ _id: 'p1', name: 'Product A' });

  // Create mock booking return
  const mockBooking = { _id: 'b1', product_id: 'p1' };

  // Mock populate chain
  const populateChain = {
    populate: jest.fn().mockReturnThis()
  };
  populateChain.populate
    .mockReturnValueOnce(populateChain)
    .mockReturnValueOnce(populateChain)
    .mockReturnValueOnce(Promise.resolve(mockBooking));

  // Mock Booking.findByIdAndUpdate to return that chain
  Booking.findByIdAndUpdate.mockReturnValue(populateChain);

  await bookingController.updateBooking(req, res);

  expect(Product.findById).toHaveBeenCalledWith('p1');
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      message: 'Booking updated successfully',
      booking: mockBooking
    })
  );
});


  it('should return 404 if product does not exist', async () => {
    const req = {
      params: { id: 'b1' },
      body: { product_id: 'p2' }
    };
    const res = mockRes();

    Product.findById.mockResolvedValue(null);

    await bookingController.updateBooking(req, res);

    expect(Product.findById).toHaveBeenCalledWith('p2');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Product not found' });
  });

  it('should return 400 with invalid delivery_date format message when parsing throws error', async () => {
    req = {
      params: { id: '1234567890abcdef12345678' },
      body: { delivery_date: 'invalid-date-string' }, // malformed date
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    // Mock Date constructor to throw error (simulate catch block)
    const realDate = global.Date;
    global.Date = jest.fn(() => { throw new Error('Invalid Date'); });

    await bookingController.updateBooking(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid delivery_date format. Use YYYY-MM-DD (e.g., "2025-11-10")'
    });

    // Restore global Date
    global.Date = realDate;
  });


    it('should return 400 when delivery_time fails regex validation (first return)', async () => {
      req = {
      params: { id: '1234567890abcdef12345678' },
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    req.body.delivery_time = '99:99'; // clearly invalid HH:MM

    await bookingController.updateBooking(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid delivery_time format. Use HH:MM (e.g., "19:00")',
    });
  });

  it('should return 400 when parsing delivery_time throws error (catch block)', async () => {
        req = {
      params: { id: '1234567890abcdef12345678' },
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    req.body.delivery_time = '10:30'; // valid format, but we’ll force an exception

    // Mock Date constructor to throw an error to hit catch
    const RealDate = global.Date;
    global.Date = jest.fn(() => { throw new Error('Unexpected Date error'); });

    await bookingController.updateBooking(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid delivery_time format. Use HH:MM (e.g., "19:00")',
    });

    // Restore Date
    global.Date = RealDate;
  });

  it('should set updateData.status_id when valid status_id (found by ID)', async () => {
     req = {
      params: { id: '1234567890abcdef12345678' },
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const fakeStatus = { _id: '64b123456789abcdef123456', name: 'Confirmed' };
    BookingStatus.findById.mockResolvedValue(fakeStatus);

    req.body.status_id = '64b123456789abcdef123456';

    // Mock findByIdAndUpdate to inspect data passed in
    const mockFindByIdAndUpdate = jest.fn().mockResolvedValue({
      ...fakeStatus,
      populate: jest.fn().mockReturnThis(),
    });
    const Booking = require('../../models/Booking');
    Booking.findByIdAndUpdate = mockFindByIdAndUpdate;

    await bookingController.updateBooking(req, res);

    // Verify the controller attempted update with correct status_id
    const updateArg = mockFindByIdAndUpdate.mock.calls[0][1];
    expect(updateArg.status_id).toBe(fakeStatus._id);
  });

  //
  // TEST 2: Should set updateData.status_id when found by name
  //
  it('should set updateData.status_id when status found by name', async () => {
     req = {
      params: { id: '1234567890abcdef12345678' },
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const fakeStatus = { _id: '64b654321098abcdef123456', name: 'Delivered' };
    BookingStatus.findOne.mockResolvedValue(fakeStatus);

    req.body.status_id = 'Delivered'; // not 24 chars → lookup by name

    const mockFindByIdAndUpdate = jest.fn().mockResolvedValue({
      ...fakeStatus,
      populate: jest.fn().mockReturnThis(),
    });
    const Booking = require('../../models/Booking');
    Booking.findByIdAndUpdate = mockFindByIdAndUpdate;

    await bookingController.updateBooking(req, res);

    const updateArg = mockFindByIdAndUpdate.mock.calls[0][1];
    expect(updateArg.status_id).toBe(fakeStatus._id);
  });

  //
  // TEST 3: Should return 404 when status not found
  //
  it('should return 404 when BookingStatus is not found', async () => {
     req = {
      params: { id: '1234567890abcdef12345678' },
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    BookingStatus.findById.mockResolvedValue(null);
    req.body.status_id = '64b123456789abcdef123456';

    await bookingController.updateBooking(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Booking status not found',
    });
  });

    it('should return 400 if no bookingId', async () => {
      const req = { params: {}, body: {} }, res = mockRes();
      await bookingController.updateBooking(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

  it('should update optional fields and succeed', async () => {
  const req = {
    params: { id: '1' },
    body: {
      delivery_address: 'New Addr',
      delivery_date: '2025-11-10',
      delivery_time: '14:30',
      quantity: 4
    }
  };
  const res = mockRes();

  const mockBooking = { _id: '1' };

  const populateChain = {
    populate: jest.fn().mockReturnThis()
  };
  populateChain.populate
    .mockReturnValueOnce(populateChain)
    .mockReturnValueOnce(populateChain)
    .mockReturnValueOnce(Promise.resolve(mockBooking));

  Booking.findByIdAndUpdate.mockReturnValue(populateChain);

  await bookingController.updateBooking(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      message: 'Booking updated successfully',
      booking: mockBooking
    })
  );
});

    it('should return 404 when status_id not found (name)', async () => {
      const req = { params: { id: '1' }, body: { status_id: 'pending' } }, res = mockRes();
      BookingStatus.findOne.mockResolvedValue(null);
      await bookingController.updateBooking(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should return 404 when status_id is ObjectId-like and not found', async () => {
      const req = { params: { id: '1' }, body: { status_id: '123456789012345678901234' } }, res = mockRes();
      BookingStatus.findById.mockResolvedValue(null);
      await bookingController.updateBooking(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should handle invalid delivery_date format', async () => {
      const req = { params: { id: '1' }, body: { delivery_date: 'invalid-date' } }, res = mockRes();
      await bookingController.updateBooking(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should handle invalid delivery_time format', async () => {
      const req = { params: { id: '1' }, body: { delivery_time: '99:99' } }, res = mockRes();
      await bookingController.updateBooking(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return 404 if booking not found', async () => {
      const req = { params: { id: '1' }, body: { quantity: 2 } };
      const res = mockRes();
      
      // Mock the chain properly: findByIdAndUpdate().populate().populate().populate()
      const mockPopulateChain = {
        populate: jest.fn().mockReturnThis()
      };
      
      // The final populate call should resolve to null (no booking found)
      mockPopulateChain.populate
        .mockReturnValueOnce(mockPopulateChain)  // First .populate() call
        .mockReturnValueOnce(mockPopulateChain)  // Second .populate() call
        .mockResolvedValueOnce(null);            // Third .populate() call resolves to null
      
      Booking.findByIdAndUpdate.mockReturnValue(mockPopulateChain);
      
      await bookingController.updateBooking(req, res);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Booking not found' });
    });

    // Test to cover lines 194-195: successful update response
    it('should successfully update booking and return success message', async () => {
      const req = { params: { id: '1' }, body: { quantity: 3 } };
      const res = mockRes();
      
      const mockUpdatedBooking = {
        _id: '1',
        quantity: 3,
        user_id: { name: 'John', email: 'john@test.com' },
        product_id: { name: 'Test Product', price: 100 },
        status_id: { name: 'Pending' }
      };

      // Mock the chain properly: findByIdAndUpdate().populate().populate().populate()
      const mockPopulateChain = {
        populate: jest.fn().mockReturnThis()
      };
      
      // The final populate call should resolve to the booking object
      mockPopulateChain.populate
        .mockReturnValueOnce(mockPopulateChain)        // First .populate() call
        .mockReturnValueOnce(mockPopulateChain)        // Second .populate() call  
        .mockResolvedValueOnce(mockUpdatedBooking);    // Third .populate() call resolves to booking
      
      Booking.findByIdAndUpdate.mockReturnValue(mockPopulateChain);

      await bookingController.updateBooking(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ 
        message: 'Booking updated successfully', 
        booking: mockUpdatedBooking 
      });
    });

it('should handle internal error gracefully', async () => {
  const req = {
    body: {
      user_id: 'u1',
      product_id: 'p1',
      delivery_address: '123 Street',
      delivery_date: '2025-11-10',
      delivery_time: '19:00',
      status_id: 's1',
      quantity: 1
    }
  };
  const res = mockRes();

  // Force User.findById to throw an error
  User.findById.mockRejectedValue(new Error('DB error'));

  // Also mock Product and BookingStatus so they don’t throw before User error
  Product.findById.mockResolvedValue({ _id: 'p1', name: 'Product A' });
  BookingStatus.findById.mockResolvedValue({ _id: 's1', name: 'Pending' });

  await bookingController.createBooking(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({ message: 'Error creating booking' })
  );
});
  });

  // ---------- DELETE BOOKING ----------
  describe('deleteBooking', () => {
    it('should return 400 if bookingId missing', async () => {
      const req = { params: {} }, res = mockRes();
      await bookingController.deleteBooking(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return 404 if booking not found', async () => {
      const req = { params: { id: '1' } }, res = mockRes();
      Booking.findById.mockResolvedValue(null);
      await bookingController.deleteBooking(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should delete booking successfully', async () => {
      const req = { params: { id: '1' } }, res = mockRes();
      Booking.findById.mockResolvedValue({ _id: '1' });
      Booking.findByIdAndDelete.mockResolvedValue();
      await bookingController.deleteBooking(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should handle deleteBooking internal error', async () => {
      const req = { params: { id: '1' } }, res = mockRes();
      Booking.findById.mockRejectedValue(new Error('err'));
      await bookingController.deleteBooking(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});