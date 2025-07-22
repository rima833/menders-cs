const express = require('express');
const { protect, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// All routes require admin authentication
router.use(protect, authorizeAdmin);

// @desc    Get admin dashboard
// @route   GET /api/admin/dashboard
// @access  Private/Admin
router.get('/dashboard', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Admin dashboard - Coming soon'
  });
});

module.exports = router;