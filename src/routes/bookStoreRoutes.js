const express = require('express');
const router = express.Router();
const { createBookStoreItem, getBookStoreItems, getBookStoreItem, updateBookStoreItem, deleteBookStoreItem } = require('../controllers/bookStoreController');

// Public booking routes
router.post('/', createBookStoreItem);
router.get('/', getBookStoreItems);
router.get('/:id', getBookStoreItem);
router.put('/:id', updateBookStoreItem);
router.delete('/:id', deleteBookStoreItem);

module.exports = router;