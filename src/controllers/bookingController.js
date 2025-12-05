const Booking = require('../models/Booking');
const Product = require('../models/Products');
const BookingStatus = require('../models/BookingStatus');
const User = require('../models/User');

// Create a new booking
// Required date format: delivery_date should be "YYYY-MM-DD" and delivery_time should be "HH:MM"
exports.createBooking = async (req, res) => {
  try {
    const { user_id, product_id, delivery_address, delivery_date, delivery_time, status_id, quantity } = req.body;

    // Validate input
    if (!user_id || !product_id || !delivery_address || !delivery_date || !delivery_time || !status_id || !quantity) {
      return res.status(400).json({ 
        message: 'All fields are required: user_id, product_id, delivery_address, delivery_date (YYYY-MM-DD), delivery_time (HH:MM), status_id, and quantity' 
      });
    }

    // Validate user exists
    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Validate product exists
    const product = await Product.findById(product_id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Find status by name or ID
    let status;
    if (status_id.length === 24) {
      status = await BookingStatus.findById(status_id);
    } else {
      status = await BookingStatus.findOne({ name: status_id });
    }
    if (!status) return res.status(404).json({ message: 'Booking status not found' });

    // Parse and validate dates
    let parsedDeliveryDate;
    let parsedDeliveryTime;

    try {
      // Parse delivery_date (expected format: "YYYY-MM-DD")
      parsedDeliveryDate = new Date(delivery_date);
      if (isNaN(parsedDeliveryDate.getTime())) {
        throw new Error('Invalid delivery_date');
      }

      // Parse delivery_time (expected format: "HH:MM")
      const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
      if (!timeRegex.test(delivery_time)) {
        throw new Error('Invalid delivery_time format');
      }
      
      const [hours, minutes] = delivery_time.split(':');
      parsedDeliveryTime = new Date();
      parsedDeliveryTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
    } catch (dateError) {
      return res.status(400).json({ 
        message: 'Invalid date/time format. Please use YYYY-MM-DD for delivery_date (e.g., "2025-11-10") and HH:MM for delivery_time (e.g., "19:00")' 
      });
    }

    const booking = new Booking({
      user_id: user_id,
      product_id: product_id,
      delivery_address,
      delivery_date: parsedDeliveryDate,
      delivery_time: parsedDeliveryTime,
      status_id: status._id,
      quantity: parseInt(quantity)
    });

    await booking.save();
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error });
  }
};

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    const totalBookings = await Booking.countDocuments();

    const bookings = await Booking.find()
      .populate('user_id', 'name email')
      .populate('product_id', 'name price')
      .populate('status_id', 'name')
      .skip((page - 1) * limit)
      .limit(limit);

    const totalPages = Math.ceil(totalBookings / limit);

    res.status(200).json({
      bookings,
      page,
      totalPages
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving bookings',
      error
    });
  }
};


// Get single booking
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
    .populate('user_id', 'name email')
    .populate('product_id', 'name price')
    .populate('status_id', 'name');

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving booking', error });
  }
};

// Update booking
// Required date format: delivery_date should be "YYYY-MM-DD" and delivery_time should be "HH:MM"
exports.updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { user_id, product_id, delivery_address, delivery_date, delivery_time, status_id, quantity } = req.body;

    if (!bookingId) {
      return res.status(400).json({ message: 'Booking ID is required' });
    }

    // Prepare update object
    const updateData = {};

    // Handle optional fields with validation
    if (user_id) {
      const user = await User.findById(user_id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      updateData.user_id = user_id;
    }

    if (product_id) {
      const product = await Product.findById(product_id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      updateData.product_id = product_id;
    }

    if (delivery_address) {
      updateData.delivery_address = delivery_address;
    }

    if (delivery_date) {
      try {
        const parsedDeliveryDate = new Date(delivery_date);
        if (isNaN(parsedDeliveryDate.getTime())) {
          return res.status(400).json({ message: 'Invalid delivery_date format. Use YYYY-MM-DD (e.g., "2025-11-10")' });
        }
        parsedDeliveryDate.setHours(0, 0, 0, 0); // Set time to 00:00:00
        updateData.delivery_date = parsedDeliveryDate;
      } catch (error) {
        return res.status(400).json({ message: 'Invalid delivery_date format. Use YYYY-MM-DD (e.g., "2025-11-10")' });
      }
    }

    if (delivery_time) {
      try {
        const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
        if (!timeRegex.test(delivery_time)) {
          return res.status(400).json({ message: 'Invalid delivery_time format. Use HH:MM (e.g., "19:00")' });
        }
        
        const [hours, minutes] = delivery_time.split(':');
        const parsedDeliveryTime = new Date();
        parsedDeliveryTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        updateData.delivery_time = parsedDeliveryTime;
      } catch (error) {
        return res.status(400).json({ message: 'Invalid delivery_time format. Use HH:MM (e.g., "19:00")' });
      }
    }

    if (status_id) {
      let status;
      if (status_id.length === 24) {
        status = await BookingStatus.findById(status_id);
      } else {
        status = await BookingStatus.findOne({ name: status_id });
      }
      if (!status) return res.status(404).json({ message: 'Booking status not found' });
      updateData.status_id = status._id;
    }

    if (quantity) {
      updateData.quantity = parseInt(quantity);
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      updateData,
      { new: true }
    )
      .populate('user_id', 'name email')
      .populate('product_id', 'name price')
      .populate('status_id', 'name');

    if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });

    res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error });
  }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    if (!bookingId) {
      return res.status(400).json({ message: 'Booking ID is required' });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    await Booking.findByIdAndDelete(bookingId);
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking', error });
  }
};


// Update only the booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { status_id } = req.body;

    if (!bookingId) {
      return res.status(400).json({ message: 'Booking ID is required' });
    }

    if (!status_id) {
      return res.status(400).json({ message: 'status_id is required' });
    }

    // Check if booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Validate status (can be ID or name)
    let status;
    if (status_id.length === 24) {
      status = await BookingStatus.findById(status_id);
    } else {
      status = await BookingStatus.findOne({ name: status_id });
    }

    if (!status) {
      return res.status(404).json({ message: 'Booking status not found' });
    }

    // Update only the status
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status_id: status._id },
      { new: true }
    )
    .populate('user_id', 'name email')
    .populate('product_id', 'name price')
    .populate('status_id', 'name');

    res.status(200).json({
      message: 'Booking status updated successfully',
      booking: updatedBooking
    });

  } catch (error) {
    res.status(500).json({ message: 'Error updating booking status', error });
  }
};

