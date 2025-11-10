const mongoose = require('mongoose');

const bookStoreSchema = new mongoose.Schema({
  product_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  available_qty: { 
    type: Number, 
    default: 0, 
    min: 0 
  },
  booked_qty: { 
    type: Number, 
    default: 0, 
    min: 0 
  },
  sold_qty: { 
    type: Number, 
    default: 0, 
    min: 0 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BookStore', bookStoreSchema);