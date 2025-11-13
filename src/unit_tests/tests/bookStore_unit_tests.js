const BookStore = require('../../models/BookStore');
const Product = require('../../models/Products');
const bookStoreController = require('../../controllers/bookStoreController');

// Mock DB models
jest.mock('../../models/BookStore');
jest.mock('../../models/Products');

describe('BookStore Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  // -------------------------------
  // CREATE BOOKSTORE ITEM
  // -------------------------------
  describe('createBookStoreItem', () => {
    it('should return 400 if product_id is missing', async () => {
      req.body = {};

      await bookStoreController.createBookStoreItem(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'product_id is required' });
    });

    it('should return 404 if product not found', async () => {
      req.body = { product_id: '1' };
      Product.findById.mockResolvedValue(null);

      await bookStoreController.createBookStoreItem(req, res);

      expect(Product.findById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Product not found' });
    });

    it('should create a new BookStore item successfully', async () => {
      req.body = { product_id: '1', available_qty: 10, booked_qty: 2, sold_qty: 1 };
      Product.findById.mockResolvedValue({ _id: '1', name: 'Book' });

      const mockSave = jest.fn().mockResolvedValue(req.body);
      BookStore.mockImplementation(() => ({ save: mockSave }));

      await bookStoreController.createBookStoreItem(req, res);

      expect(mockSave).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'BookStore item created successfully' })
      );
    });

    it('should handle errors', async () => {
      req.body = { product_id: '1' };
      Product.findById.mockRejectedValue(new Error('DB error'));

      await bookStoreController.createBookStoreItem(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Error creating BookStore item' })
      );
    });
  });

  // -------------------------------
  // GET ALL BOOKSTORE ITEMS
  // -------------------------------
  describe('getBookStoreItems', () => {
    it('should return all items', async () => {
      const mockItems = [{ _id: '1' }, { _id: '2' }];
      BookStore.find.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockItems)
      });

      await bookStoreController.getBookStoreItems(req, res);

      expect(BookStore.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockItems);
    });

    it('should handle DB errors', async () => {
      BookStore.find.mockReturnValue({
        populate: jest.fn().mockRejectedValue(new Error('DB Error'))
      });

      await bookStoreController.getBookStoreItems(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Error retrieving BookStore items' })
      );
    });
  });

  // -------------------------------
  // GET SINGLE BOOKSTORE ITEM
  // -------------------------------
  describe('getBookStoreItem', () => {
    it('should return a BookStore item', async () => {
      req.params = { id: '123' };
      const mockItem = { _id: '123' };
      BookStore.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockItem)
      });

      await bookStoreController.getBookStoreItem(req, res);

      expect(BookStore.findById).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockItem);
    });

    it('should return 404 if item not found', async () => {
      req.params = { id: '123' };
      BookStore.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(null)
      });

      await bookStoreController.getBookStoreItem(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'BookStore item not found' });
    });

    it('should handle errors', async () => {
      req.params = { id: '123' };
      BookStore.findById.mockReturnValue({
        populate: jest.fn().mockRejectedValue(new Error('DB error'))
      });

      await bookStoreController.getBookStoreItem(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Error retrieving BookStore item' })
      );
    });
  });

  // -------------------------------
  // UPDATE BOOKSTORE ITEM
  // -------------------------------
  describe('updateBookStoreItem', () => {
    it('should update BookStore item successfully', async () => {
      req.params = { id: '1' };
      req.body = { available_qty: 5, booked_qty: 2 };

      const mockItem = {
        save: jest.fn().mockResolvedValue(true),
        available_qty: 1,
        booked_qty: 0,
        sold_qty: 0
      };

      BookStore.findById.mockResolvedValue(mockItem);

      await bookStoreController.updateBookStoreItem(req, res);

      expect(mockItem.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'BookStore item updated successfully' })
      );
    });

   it('should return 404 if item not found', async () => {
  req.params = { id: '1' };
  req.body = {}; // ensure req.body exists
  BookStore.findById.mockResolvedValue(null); // ensure async mock

  await bookStoreController.updateBookStoreItem(req, res);

  expect(BookStore.findById).toHaveBeenCalledWith('1');
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({ message: 'BookStore item not found' });
});

    it('should handle DB errors', async () => {
      req.params = { id: '1' };
      BookStore.findById.mockRejectedValue(new Error('DB Error'));

      await bookStoreController.updateBookStoreItem(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Error updating BookStore item' })
      );
    });

        it('should update only provided qty fields', async () => {
  req.params = { id: '1' };
  req.body = { available_qty: 5, sold_qty: 2 }; // booked_qty intentionally missing

  const mockItem = {
    available_qty: 1,
    booked_qty: 3,
    sold_qty: 0,
    save: jest.fn().mockResolvedValue(true),
  };

  BookStore.findById.mockResolvedValue(mockItem);

  await bookStoreController.updateBookStoreItem(req, res);

  expect(mockItem.available_qty).toBe(5);
  expect(mockItem.sold_qty).toBe(2);
  expect(mockItem.booked_qty).toBe(3); // unchanged
  expect(mockItem.save).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({ message: 'BookStore item updated successfully' })
  );
});
  });

  // -------------------------------
  // DELETE BOOKSTORE ITEM
  // -------------------------------
  describe('deleteBookStoreItem', () => {
    it('should delete BookStore item successfully', async () => {
      req.params = { id: '1' };
      BookStore.findById.mockResolvedValue({ _id: '1' });
      BookStore.findByIdAndDelete.mockResolvedValue(true);

      await bookStoreController.deleteBookStoreItem(req, res);

      expect(BookStore.findById).toHaveBeenCalledWith('1');
      expect(BookStore.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'BookStore item deleted successfully' });
    });

    it('should return 404 if item not found', async () => {
      req.params = { id: '1' };
      BookStore.findById.mockResolvedValue(null);

      await bookStoreController.deleteBookStoreItem(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'BookStore item not found' });
    });

    it('should handle DB errors', async () => {
      req.params = { id: '1' };
      BookStore.findById.mockRejectedValue(new Error('DB Error'));

      await bookStoreController.deleteBookStoreItem(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Error deleting BookStore item' })
      );
    });

    it('should default qty values to 0 when not provided', async () => {
  req.body = { product_id: '1' };
  Product.findById.mockResolvedValue({ _id: '1', name: 'Book' });

  const mockSave = jest.fn().mockResolvedValue(true);
  BookStore.mockImplementation((data) => {
    // This block is executed when "new BookStore(data)" runs.
    expect(data.available_qty).toBe(0);
    expect(data.booked_qty).toBe(0);
    expect(data.sold_qty).toBe(0);
    return { save: mockSave };
  });

  await bookStoreController.createBookStoreItem(req, res);

  expect(mockSave).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      message: 'BookStore item created successfully'
    })
  );
});
  });
});
