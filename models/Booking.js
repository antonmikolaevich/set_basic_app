const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  product_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  delivery_address: { 
    type: String, 
    required: true 
  },
  delivery_date: { 
    type: Date, 
    required: true 
  },
  delivery_time: { 
    type: Date, 
    required: true 
  },
  status_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'BookingStatus', 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: 1 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);