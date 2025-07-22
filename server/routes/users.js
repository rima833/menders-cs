const express = require('express');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes are protected and require authentication
router.use(protect);

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user
    }
  });
});

module.exports = router;