const express = require('express');
const { addCar, findCars } = require('../controllers/productController');

const router = express.Router();

// Route to add a new car
router.post('/cars', addCar);

// Route to get cars with optional filters
router.get('/cars', findCars);

module.exports = router;
