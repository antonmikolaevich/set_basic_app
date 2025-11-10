const mongoose = require('mongoose');

const bookingStatusSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    enum: ['SUBMITTED', 'REJECTED', 'APPROVED', 'CANCELLED', 'IN_DELIVERY'] 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BookingStatus', bookingStatusSchema);