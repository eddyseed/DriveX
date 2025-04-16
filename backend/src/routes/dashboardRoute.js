const express = require('express');
const router = express.Router();

const {verifyToken} = require('../middleware/authMiddleware');
const { getDashboardData } = require('../controllers/dashController');

// Protect this route
router.post('/dashboard', verifyToken, getDashboardData);

module.exports = router;