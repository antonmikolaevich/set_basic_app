const mongoose = require('mongoose');
const BookingStatus = require('./models/BookingStatus'); // adjust path
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const seedBookingStatuses = async () => {
  try {
    const statuses = [
      { name: 'SUBMITTED' },
      { name: 'REJECTED' },
      { name: 'APPROVED' },
      { name: 'CANCELLED' },
      { name: 'IN_DELIVERY' }
    ];

    for (let status of statuses) {
      await BookingStatus.updateOne(
        { name: status.name }, // use name as unique key here
        { $setOnInsert: status },
        { upsert: true }
      );
    }

    console.log('Booking statuses seeded successfully');
  } catch (error) {
    console.error('Error seeding booking statuses:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedBookingStatuses();