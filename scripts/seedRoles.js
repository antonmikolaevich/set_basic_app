const mongoose = require('mongoose');
const Role = require('../src/models/Role');
require('dotenv').config(); // make sure path is correct

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const seedRoles = async () => {
  try {
    const roles = [
      { _id: 1, name: 'ADMIN' },
      { _id: 2, name: 'MANAGER' },
      { _id: 3, name: 'CUSTOMER' }
    ];

    for (let role of roles) {
      await Role.updateOne(
        { _id: role._id }, 
        { $setOnInsert: role }, 
        { upsert: true }
      );
    }

    console.log('Roles seeded successfully');
  } catch (error) {
    console.error('Error seeding roles:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedRoles();