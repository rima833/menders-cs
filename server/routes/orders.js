const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Orders endpoint - Coming soon'
  });
});

module.exports = router;