const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  address: String,
  login: { type: String, required: true, unique: true },
  role_id: {
    type: Number,        // reference numeric role ID
    ref: 'Role',
    required: true
  }
}, {
  timestamps: true
});

// Optional: virtual populate for bookings
userSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'user_id'
});

module.exports = mongoose.model('User', userSchema);