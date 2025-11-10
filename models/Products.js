const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  author: { 
    type: String 
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  image_path: { 
    type: String 
  }
}, {
  timestamps: true
});

// Optional: virtual populate to show all bookings for a product
productSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'product_id'
});

module.exports = mongoose.model('Product', productSchema);