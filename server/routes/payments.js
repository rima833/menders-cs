const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// @desc    Process payment
// @route   POST /api/payments/process
// @access  Private
router.post('/process', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Payment processing - Coming soon'
  });
});

module.exports = router;