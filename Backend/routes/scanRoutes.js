// Backend/routes/scanRoutes.js
const express = require('express');
const router = express.Router();
const { scanUrl, getScans } = require('../controllers/scanController');
const { protect } = require('../middleware/authMiddleware');

router.post('/scan', protect, scanUrl);
router.get('/history', protect, getScans);

module.exports = router;