const express = require('express');
const authProcess = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

// const verifyRecaptcha = require('../middleware/recaptchaMiddleware');

const router = express.Router();

// Add reCAPTCHA verification before processing requests
router.post('/signup', authProcess.signup);
// router.post('/login', authProcess.login);
// router.post('/logout', authProcess.logout)
// router.get("/me", verifyToken, authProcess.returnUser);


module.exports = router;
