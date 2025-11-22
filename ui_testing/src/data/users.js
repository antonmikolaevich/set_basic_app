const updatedUser = 
    {
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+123456789",
  "address": "123 Main Street",
  "login": "johndoe",
  "role_id": '1'
};

const newProduct = {
    "name": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "description": "A novel set in the Roaring Twenties, exploring themes of decadence, idealism, resistance to change, social upheaval, and excess.",
    "price": "10.99",
    "image": "https://example.com/images/great-gatsby.jpg",
}

const newBooking = {
    "delivery_address": "456 Elm Street",
    "delivery_date": "12/10/2025",
    "delivery_time": "13:45",
    "quantity": "1"
}

const newBookstore = {
    "available_quantity": "100",
    "booked_quantity": "1",
    "sold_quantity": "50"
}

module.exports = { updatedUser, newProduct, newBooking, newBookstore };