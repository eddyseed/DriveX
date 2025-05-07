const express = require('express');
const ProductController = require('../controllers/productController');

const router = express.Router();

router.post('/fetchSearchQuery', ProductController.handleSearchQuery)
router.post('/addUsedCar', ProductController.addUsedCarDetails)
// router.get('/initialdata', ProductController.handleCarQuery)
module.exports = router;
