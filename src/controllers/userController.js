const User = require('../models/User');
const Role = require('../models/Role');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('role_id', 'name');// Exclude password field
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(userId).populate('role_id', 'name');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name,  email, phone, address, login, role_id } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id,
      { name,  email, phone, address, login, role_id },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

//Create user
exports.createUser = async (req, res) => {
  console.log('=== CREATE USER CALLED ===');
  
  try {
    const { name, email, phone, address, login, role_id } = req.body;
    
    console.log('Received data:', { name, email, phone, address, login, role_id });

    if (!name || !email || !login || !role_id) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'Name, email, login, and role_id are required' });
    }

    console.log('Checking existing email...');
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      console.log('Email already exists');
      return res.status(400).json({ message: 'Email already exists' });
    }

    console.log('Checking existing login...');
    const existingLogin = await User.findOne({ login });
    if (existingLogin) {
      console.log('Login already exists');
      return res.status(400).json({ message: 'Login already exists' });
    }

    console.log('Looking for role with ID:', role_id);
    const role = await Role.findById(role_id);
    console.log('Found role:', role);
    if (!role) {
      console.log('Invalid role_id');
      return res.status(400).json({ message: 'Invalid role_id' });
    }

    console.log('Creating new user...');
    const user = new User({ name, email, phone, address, login, role_id });
    console.log('User object created:', user);
    
    console.log('Saving user...');
    await user.save();
    console.log('User saved successfully');

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating user:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ 
      message: 'Error creating user', 
      error: error.message
    });
  }
};