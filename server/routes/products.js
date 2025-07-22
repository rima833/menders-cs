const express = require('express');
const { body, query, validationResult } = require('express-validator');
const Product = require('../models/Product');
const Vendor = require('../models/Vendor');
const { protect, authorizeVendor, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all products with filtering, sorting, and pagination
// @route   GET /api/products
// @access  Public
router.get('/', optionalAuth, [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('sort').optional().isIn(['newest', 'oldest', 'price_low', 'price_high', 'rating', 'popular']).withMessage('Invalid sort option'),
  query('category').optional().notEmpty().withMessage('Category cannot be empty'),
  query('minPrice').optional().isFloat({ min: 0 }).withMessage('Min price must be positive'),
  query('maxPrice').optional().isFloat({ min: 0 }).withMessage('Max price must be positive')
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = { status: 'active' };

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }

    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice);
    }

    if (req.query.vendor) {
      filter.vendor = req.query.vendor;
    }

    // Build sort object
    let sort = {};
    switch (req.query.sort) {
      case 'newest':
        sort = { createdAt: -1 };
        break;
      case 'oldest':
        sort = { createdAt: 1 };
        break;
      case 'price_low':
        sort = { price: 1 };
        break;
      case 'price_high':
        sort = { price: -1 };
        break;
      case 'rating':
        sort = { 'rating.average': -1 };
        break;
      case 'popular':
        sort = { totalSales: -1 };
        break;
      default:
        sort = { createdAt: -1 };
    }

    const products = await Product.find(filter)
      .populate('vendor', 'businessName rating isVerified')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      status: 'success',
      data: {
        products,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', optionalAuth, async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('vendor', 'businessName businessDescription rating isVerified businessLogo')
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: 'firstName lastName avatar'
        },
        options: { limit: 10, sort: { createdAt: -1 } }
      });

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
    }

    // Increment view count if not vendor viewing own product
    if (!req.user || req.user._id.toString() !== product.vendor.user.toString()) {
      product.views += 1;
      await product.save();
    }

    res.status(200).json({
      status: 'success',
      data: {
        product
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Vendor
router.post('/', protect, authorizeVendor, [
  body('name').notEmpty().withMessage('Product name is required'),
  body('description').notEmpty().withMessage('Product description is required'),
  body('category').notEmpty().withMessage('Product category is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('inventory.stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Add vendor to product data
    req.body.vendor = req.vendor._id;

    const product = await Product.create(req.body);

    // Update vendor's total products count
    await Vendor.findByIdAndUpdate(req.vendor._id, {
      $inc: { totalProducts: 1 }
    });

    res.status(201).json({
      status: 'success',
      message: 'Product created successfully',
      data: {
        product
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Vendor
router.put('/:id', protect, authorizeVendor, async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
    }

    // Make sure vendor owns the product (admin can edit any product)
    if (req.user.role !== 'admin' && product.vendor.toString() !== req.vendor._id.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this product'
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      message: 'Product updated successfully',
      data: {
        product
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Vendor
router.delete('/:id', protect, authorizeVendor, async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
    }

    // Make sure vendor owns the product (admin can delete any product)
    if (req.user.role !== 'admin' && product.vendor.toString() !== req.vendor._id.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to delete this product'
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    // Update vendor's total products count
    await Vendor.findByIdAndUpdate(product.vendor, {
      $inc: { totalProducts: -1 }
    });

    res.status(200).json({
      status: 'success',
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;