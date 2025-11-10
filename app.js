const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs'); // Import YAML loader
const path = require('path');

const app = express();

app.use(express.json());

// Route imports
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/bookstore', require('./routes/bookStoreRoutes'));

//Load Swagger YAML file
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger', 'swagger.yaml'));

//Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

app.listen(process.env.PORT || 5000, () => console.log('🚀 Server running'));
