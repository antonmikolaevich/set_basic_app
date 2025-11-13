const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  _id: {                // Use _id as numeric
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['ADMIN', 'MANAGER', 'CUSTOMER']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Role', roleSchema);
