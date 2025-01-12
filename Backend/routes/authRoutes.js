const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public routes - no authentication needed
router.post('/register', register);
router.post('/login', login);

// Protected routes - require authentication
router.get('/me', protect, getMe);

module.exports = router;