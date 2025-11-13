// /models/index.js
const mongoose = require('mongoose');

// Import models
const Product = require('./Product');
const StoreItem = require('./StoreItem');
const Booking = require('./Booking');
const BookingStatus = require('./BookingStatus');
const User = require('./User');
const Roles = require('./Role');

module.exports = {
  mongoose,
  Product,
  StoreItem,
  Booking,
  BookingStatus,
  User,
  Roles
};
