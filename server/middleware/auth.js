const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify JWT token
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          status: 'error',
          message: 'User not found'
        });
      }

      if (!req.user.isActive) {
        return res.status(401).json({
          status: 'error',
          message: 'Your account has been deactivated'
        });
      }

      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(401).json({
        status: 'error',
        message: 'Not authorized, token failed'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Not authorized, no token'
    });
  }
};

// Role-based authorization
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        message: 'User not authenticated'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }

    next();
  };
};

// Vendor authorization - ensure user is vendor and owns the resource
const authorizeVendor = async (req, res, next) => {
  try {
    if (req.user.role !== 'vendor' && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied. Vendor access required.'
      });
    }

    if (req.user.role === 'vendor') {
      const Vendor = require('../models/Vendor');
      const vendor = await Vendor.findOne({ user: req.user._id });
      
      if (!vendor) {
        return res.status(403).json({
          status: 'error',
          message: 'Vendor profile not found'
        });
      }

      if (!vendor.isActive || !vendor.isVerified) {
        return res.status(403).json({
          status: 'error',
          message: 'Vendor account is not active or verified'
        });
      }

      req.vendor = vendor;
    }

    next();
  } catch (error) {
    console.error('Vendor authorization error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Server error during authorization'
    });
  }
};

// Admin authorization
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Access denied. Admin access required.'
    });
  }
  next();
};

// Optional auth - for routes that work with or without authentication
const optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    } catch (error) {
      // Token is invalid, but that's ok for optional auth
      req.user = null;
    }
  }

  next();
};

module.exports = {
  protect,
  authorize,
  authorizeVendor,
  authorizeAdmin,
  optionalAuth
};