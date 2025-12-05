const BookStore = require('../models/BookStore');
const Product = require('../models/Products');

// Create a new BookStore item
exports.createBookStoreItem = async (req, res) => {
  try {
    const { product_id, available_qty, booked_qty, sold_qty } = req.body;

    // Validate required fields
    if (!product_id) {
      return res.status(400).json({ message: 'product_id is required' });
    }

    // Check if product exists
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const newBookStoreItem = new BookStore({
      product_id,
      available_qty: available_qty || 0,
      booked_qty: booked_qty || 0,
      sold_qty: sold_qty || 0,
    });

    await newBookStoreItem.save();
    res.status(201).json({ message: 'BookStore item created successfully', bookStoreItem: newBookStoreItem });
  } catch (error) {
    res.status(500).json({ message: 'Error creating BookStore item', error });
  }
};

// Get all BookStore items
exports.getBookStoreItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    const totalStores = await BookStore.countDocuments();

    const bookStoreItems = await BookStore.find()
      .populate('product_id', 'name description price author image_path')
      .skip((page - 1) * limit)
      .limit(limit);

    const totalPages = Math.ceil(totalStores / limit);

    res.status(200).json({
      stores: bookStoreItems,
      page,
      totalPages
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving BookStore items',
      error
    });
  }
};

// Get a single BookStore item by ID (with product details)
exports.getBookStoreItem = async (req, res) => {
  try {
    const bookStoreItem = await BookStore.findById(req.params.id).populate('product_id', 'name description price author image_path');
    if (!bookStoreItem) {
      return res.status(404).json({ message: 'BookStore item not found' });
    }
    res.status(200).json(bookStoreItem);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving BookStore item', error });
  }
};

// Update BookStore item
exports.updateBookStoreItem = async (req, res) => {
  try {
    const { available_qty, booked_qty, sold_qty } = req.body;

    const bookStoreItem = await BookStore.findById(req.params.id);
    if (!bookStoreItem) {
      return res.status(404).json({ message: 'BookStore item not found' });
    }

    if (available_qty !== undefined) bookStoreItem.available_qty = available_qty;
    if (booked_qty !== undefined) bookStoreItem.booked_qty = booked_qty;
    if (sold_qty !== undefined) bookStoreItem.sold_qty = sold_qty;

    await bookStoreItem.save();
    res.status(200).json({ message: 'BookStore item updated successfully', bookStoreItem });
  } catch (error) {
    res.status(500).json({ message: 'Error updating BookStore item', error });
  }
};

// Delete BookStore item
exports.deleteBookStoreItem = async (req, res) => {
  try {
    const bookStoreItem = await BookStore.findById(req.params.id);
    if (!bookStoreItem) {
      return res.status(404).json({ message: 'BookStore item not found' });
    }

    await BookStore.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'BookStore item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting BookStore item', error });
  }
};
