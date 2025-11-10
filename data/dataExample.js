const newUser ={
  "name": "John Travolta",
  "email": "john_travolta@gmail.com",
  "phone": "+48123456789",
  "address": "US, Texas, Houston, 1234 Elm Street",
  "login": "john_travolta",
  "role_id": 1
}

const newUserUpd = {
  "name": "Nicolas Cage",
  "email": "nic_cage@gmail.com",
  "phone": "+48123456789",
  "address": "US, Washington, Seattle, 5678 Oak Avenue",
  "login": "nic_cage",
  "role_id": 1
}

const userBooking = {
  "name": "Michael Douglas",
  "email": "michael_douglas@gmail.com",
  "phone": "+48123456789",
  "address": "US, Detroit, 5678 Oak Avenue",
  "login": "michael_douglas",
  "role_id": 1
}

const newProduct = {
  "name": "Burining Daylight",
  "description": "Novel in Alaska gold chase",
  "author": "Jack London",
  "price": 19.99,
  "image_path": "/uploads/london.jpg"
}

const newProductUpd = {
  "name": "White Fang",
  "description": "Novel in Alaska about dogs life",
  "author": "Jack London",
  "price": 29.99,
  "image_path": "/uploads/london.jpg"
}

const productBooking = {
  "name": "Unknown book",
  "description": "Unkonwn description",
  "author": "John Doe",
  "price": 19.99,
  "image_path": "/uploads/london.jpg"
}

const newBooking = {
    user_id: "",
    product_id: "",
    delivery_address: "123 Delivery Street",
    delivery_date: "2025-11-08",
    delivery_time: "19:00",
    status_id: "SUBMITTED",
    quantity: 2
  }

const newBookingUpd = {
    user_id: "",
    product_id: "",
    delivery_address: "123 Delivery Street",
    delivery_date: "2025-11-08",
    delivery_time: "19:00",
    status_id: "APPROVED",
    quantity: 2
}   

const bookstoreItem = {
  "product_id": "",
  "available_qty": 100,
  "booked_qty": 10,
  "sold_qty": 5
}

const bookstoreItemUpd = {
  "product_id": "",
  "available_qty": 100,
  "booked_qty": 10,
  "sold_qty": 5
}


module.exports = {
  newUser,
  newUserUpd,
  newProduct,
  newProductUpd,
  userBooking,
  productBooking,
  newBooking,
  newBookingUpd,
  bookstoreItem,
  bookstoreItemUpd
}