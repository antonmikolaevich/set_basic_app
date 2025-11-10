/**
 * @file tests/userController.unit.test.js
 * Unit tests for createUser() in userController
 */

const { createUser, deleteUser, updateUser, getUserById, getAllUsers } = require('../controllers/userController');
const User = require('../models/User');
const Role = require('../models/Role');

// Mock all model dependencies
jest.mock('../models/User');
jest.mock('../models/Role');

describe("Unit testing for user controller", () => {

describe('createUser - Unit Tests', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    jest.clearAllMocks();

    mockReq = {
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123456789',
        address: '123 Main St',
        login: 'johnny',
        role_id: 'role123'
      }
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  //Test 1: Successfully create a user
  test('should create a user successfully when valid data provided', async () => {
    // --- Mocking dependencies ---
    User.findOne.mockResolvedValueOnce(null); // No email conflict
    User.findOne.mockResolvedValueOnce(null); // No login conflict
    Role.findById.mockResolvedValue({ _id: 'role123', name: 'Admin' });
    
    // Mock the save() behavior of a new User instance
    const mockSave = jest.fn().mockResolvedValue({
      _id: 'user123',
      name: 'John Doe',
      email: 'john@example.com',
      login: 'johnny',
      role_id: 'role123'
    });

    // When new User() is called, return an object with a mocked save method
    User.mockImplementation(() => ({ save: mockSave }));

    // --- Execute ---
    await createUser(mockReq, mockRes);

    // --- Verify expected flow ---
    expect(User.findOne).toHaveBeenNthCalledWith(1, { email: 'john@example.com' });
    expect(User.findOne).toHaveBeenNthCalledWith(2, { login: 'johnny' });
    expect(Role.findById).toHaveBeenCalledWith('role123');
    expect(mockSave).toHaveBeenCalledTimes(1);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(
  expect.objectContaining({
    message: 'User created successfully',
    user: expect.objectContaining({
      save: expect.any(Function)
     })
   })
 );
  });

  // Test 2: Missing required fields
  test('should return 400 if required fields are missing', async () => {
    mockReq.body = { email: '', login: '', role_id: '' };

    await createUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.stringContaining('required') })
    );
  });

  // Test 3: Email already exists
  test('should return 400 if email already exists', async () => {
    User.findOne.mockResolvedValueOnce({ _id: 'existingUser' }); // Email conflict

    await createUser(mockReq, mockRes);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Email already exists' })
    );
  });

  // Test 4: Login already exists
  test('should return 400 if login already exists', async () => {
    // First call (check email) returns null, second (check login) returns conflict
    User.findOne
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({ _id: 'existingLogin' });

    await createUser(mockReq, mockRes);

    expect(User.findOne).toHaveBeenNthCalledWith(1, { email: 'john@example.com' });
    expect(User.findOne).toHaveBeenNthCalledWith(2, { login: 'johnny' });
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Login already exists' })
    );
  });

  // Test 5: Invalid role_id
  test('should return 400 if role_id is invalid', async () => {
    User.findOne.mockResolvedValueOnce(null);
    User.findOne.mockResolvedValueOnce(null);
    Role.findById.mockResolvedValue(null); // Role not found

    await createUser(mockReq, mockRes);

    expect(Role.findById).toHaveBeenCalledWith('role123');
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Invalid role_id' })
    );
  });

  //Test 6: Unexpected error handling
  test('should return 500 if an exception occurs', async () => {
    User.findOne.mockRejectedValue(new Error('DB failure'));

    await createUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Error creating user',
        error: 'DB failure'
      })
    );
  });
});


describe('deleteUser controller', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = { params: { id: '12345' } };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  // Missing userId
  test('should return 400 if userId is missing', async () => {
    mockReq.params.id = null;

    await deleteUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'User ID is required' })
    );
  });

  // User not found
  test('should return 404 if user not found', async () => {
    User.findByIdAndDelete.mockResolvedValue(null);

    await deleteUser(mockReq, mockRes);

    expect(User.findByIdAndDelete).toHaveBeenCalledWith('12345');
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'User not found' })
    );
  });

  // Successful deletion
  test('should return 200 if user deleted successfully', async () => {
    User.findByIdAndDelete.mockResolvedValue({ _id: '12345', name: 'John Doe' });

    await deleteUser(mockReq, mockRes);

    expect(User.findByIdAndDelete).toHaveBeenCalledWith('12345');
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'User deleted successfully' })
    );
  });

  // Internal server error
  test('should return 500 if an exception occurs', async () => {
    User.findByIdAndDelete.mockRejectedValue(new Error('Database error'));

    await deleteUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Error deleting user',
        error: expect.any(Error),
      })
    );
  });
});

describe('updateUser controller', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      params: { id: '12345' },
      body: { 
        name: 'John Updated', 
        email: 'john.updated@example.com', 
        phone: '1234567890',
        address: '123 Street',
        login: 'john_updated',
        role_id: 'role123'
      }
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  //  Missing userId
  test('should return 400 if userId is missing', async () => {
    mockReq.params.id = null;

    await updateUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'User ID is required' })
    );
  });

  // User not found
  test('should return 404 if user not found', async () => {
    User.findByIdAndUpdate.mockResolvedValue(null);

    await updateUser(mockReq, mockRes);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      '12345',
      mockReq.body,
      { new: true }
    );
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'User not found' })
    );
  });

  //  Successful update
  test('should return 200 if user updated successfully', async () => {
    const updatedUserMock = { _id: '12345', ...mockReq.body };
    User.findByIdAndUpdate.mockResolvedValue(updatedUserMock);

    await updateUser(mockReq, mockRes);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      '12345',
      mockReq.body,
      { new: true }
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'User updated successfully',
        user: updatedUserMock
      })
    );
  });

  //  Internal server error
  test('should return 500 if an exception occurs', async () => {
    User.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

    await updateUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Error updating user',
        error: expect.any(Error)
      })
    );
  });
});

describe('getUserById controller', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = { params: { id: '12345' } };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  test('should return 400 if userId is missing', async () => {
    mockReq.params.id = null;

    await getUserById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'User ID is required' })
    );
  });

  test('should return 404 if user not found', async () => {
    User.findById = jest.fn().mockReturnValue({
    populate: jest.fn().mockResolvedValue(null)
  });

    await getUserById(mockReq, mockRes);

    expect(User.findById).toHaveBeenCalledWith('12345');
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'User not found' })
    );
  });

  test('should return 200 and user data if user exists', async () => {
    const mockUser = { _id: '12345', name: 'John', email: 'john@example.com' };
    // Mock populate chain
    User.findById.mockReturnValue({
      populate: jest.fn().mockResolvedValue(mockUser),
    });

    await getUserById(mockReq, mockRes);

    expect(User.findById).toHaveBeenCalledWith('12345');
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockUser);
  });

  test('should return 500 if database throws error', async () => {
    User.findById.mockImplementation(() => {
      throw new Error('Database error');
    });

    await getUserById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith(
  expect.objectContaining({ message: 'Error fetching user', error: expect.any(Error) })
);
  });
});

describe('getAllUsers controller', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {}; // no params or body needed
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  test('should return all users successfully', async () => {
    const mockUsers = [
      { name: 'John', email: 'john@example.com', role_id: { name: 'Admin' } },
      { name: 'Jane', email: 'jane@example.com', role_id: { name: 'User' } },
    ];

    User.find.mockReturnValue({
      populate: jest.fn().mockResolvedValue(mockUsers)
    });

    await getAllUsers(mockReq, mockRes);

    expect(User.find).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockUsers);
  });

  test('should return 500 if database throws error', async () => {
    User.find.mockReturnValue({
      populate: jest.fn().mockRejectedValue(new Error('Database error'))
    });

    await getAllUsers(mockReq, mockRes);

    expect(User.find).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Error fetching users',
        error: expect.any(Error)
      })
    );
  });
});

})
