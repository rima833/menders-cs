const express = require('express');
const { protect, authorizeVendor } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all vendors
// @route   GET /api/vendors
// @access  Public
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Vendors endpoint - Coming soon'
  });
});

// @desc    Get vendor dashboard
// @route   GET /api/vendors/dashboard
// @access  Private/Vendor
router.get('/dashboard', protect, authorizeVendor, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Vendor dashboard - Coming soon'
  });
});

module.exports = router;