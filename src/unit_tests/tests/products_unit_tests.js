const Product = require('../../models/Products');
const productController = require('../../controllers/productsControllers');

// Mock the Product model
jest.mock('../../models/Products');

describe('Product Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  // GET ALL PRODUCTS
  describe('getProducts', () => {
    it('should return all products with status 200', async () => {
      const mockProducts = [{ name: 'Book 1' }, { name: 'Book 2' }];
      Product.find.mockResolvedValue(mockProducts);

      await productController.getProducts(req, res);

      expect(Product.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProducts);
    });

    it('should handle errors properly', async () => {
      Product.find.mockRejectedValue(new Error('DB Error'));

      await productController.getProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Error retrieving products' })
      );
    });
  });

  // GET SINGLE PRODUCT
  describe('getProduct', () => {
    it('should return product by id', async () => {
      req.params = { id: '123' };
      const mockProduct = { _id: '123', name: 'Book' };
      Product.findById.mockResolvedValue(mockProduct);

      await productController.getProduct(req, res);

      expect(Product.findById).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });

 it('should return 404 if product not found', async () => {
  req.params = { id: '123' };

  // Mock the correct Mongoose call for getProduct
  Product.findById = jest.fn().mockResolvedValue(null);

  await productController.getProduct(req, res);

  expect(Product.findById).toHaveBeenCalledWith('123');
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({ message: 'Product not found' });
});

    it('should handle DB errors', async () => {
      req.params = { id: '123' };
      Product.findById.mockRejectedValue(new Error('DB Error'));

      await productController.getProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Error retrieving product' })
      );
    });
  });

  // CREATE PRODUCT
  describe('createProduct', () => {
    it('should create a new product successfully', async () => {
      req.body = { name: 'Book', price: 15 };
      const mockSave = jest.fn().mockResolvedValue(req.body);
      Product.mockImplementation(() => ({ save: mockSave }));

      await productController.createProduct(req, res);

      expect(mockSave).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Product created successfully' })
      );
    });

    it('should return 400 if name or price is missing', async () => {
      req.body = { name: '' };

      await productController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Name and price are required' });
    });

    it('should handle errors during creation', async () => {
      req.body = { name: 'Book', price: 10 };
      const mockSave = jest.fn().mockRejectedValue(new Error('Save failed'));
      Product.mockImplementation(() => ({ save: mockSave }));

      await productController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Error creating product' })
      );
    });
  });

  // UPDATE PRODUCT
  describe('updateProduct', () => {
    it('should update product successfully', async () => {
      req.params = { id: '123' };
      req.body = { name: 'Updated', price: 25 };
      const updatedProduct = { _id: '123', ...req.body };

      Product.findByIdAndUpdate.mockResolvedValue(updatedProduct);

      await productController.updateProduct(req, res);

      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
        '123',
        req.body,
        { new: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Product updated successfully' })
      );
    });

   it('should return 404 if product not found', async () => {
  req.params = { id: '123' };
  req.body = { name: 'New Name', price: 10 };

  Product.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

  await productController.updateProduct(req, res);

  expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
    '123',
    expect.objectContaining({ name: 'New Name', price: 10 }),
    { new: true }
  );
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({ message: 'Product not found' });
});

    it('should handle DB errors', async () => {
      req.params = { id: '123' };
      Product.findByIdAndUpdate.mockRejectedValue(new Error('DB Error'));

      await productController.updateProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Error updating product' })
      );
    });
  });

  // DELETE PRODUCT
  describe('deleteProduct', () => {
    it('should delete product successfully', async () => {
      req.params = { id: '123' };
      Product.findByIdAndDelete.mockResolvedValue({ _id: '123' });

      await productController.deleteProduct(req, res);

      expect(Product.findByIdAndDelete).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Product deleted successfully' });
    });

    it('should return 404 if product not found', async () => {
      req.params = { id: '123' };
      Product.findByIdAndDelete.mockResolvedValue(null);

      await productController.deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Product not found' });
    });

    it('should handle DB errors', async () => {
      req.params = { id: '123' };
      Product.findByIdAndDelete.mockRejectedValue(new Error('DB Error'));

      await productController.deleteProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Error deleting product' })
      );
    });
  });
});
