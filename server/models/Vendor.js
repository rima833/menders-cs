const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  businessName: {
    type: String,
    required: [true, 'Business name is required'],
    trim: true,
    maxlength: [100, 'Business name cannot exceed 100 characters']
  },
  businessDescription: {
    type: String,
    required: [true, 'Business description is required'],
    maxlength: [1000, 'Business description cannot exceed 1000 characters']
  },
  businessCategory: {
    type: String,
    required: [true, 'Business category is required'],
    enum: [
      'Fashion & Clothing',
      'Electronics',
      'Beauty & Personal Care',
      'Home & Garden',
      'Sports & Outdoors',
      'Books & Media',
      'Automotive',
      'Jewelry & Accessories',
      'Health & Wellness',
      'Food & Beverages',
      'Arts & Crafts',
      'Other'
    ]
  },
  businessLogo: {
    type: String,
    default: null
  },
  businessImages: [{
    type: String
  }],
  businessAddress: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: String,
    country: {
      type: String,
      default: 'Nigeria'
    }
  },
  businessDocuments: {
    cacCertificate: String, // Certificate of incorporation
    taxCertificate: String,
    businessLicense: String,
    idDocument: String
  },
  bankDetails: {
    bankName: {
      type: String,
      required: [true, 'Bank name is required']
    },
    accountNumber: {
      type: String,
      required: [true, 'Account number is required'],
      match: [/^\d{10}$/, 'Account number must be 10 digits']
    },
    accountName: {
      type: String,
      required: [true, 'Account name is required']
    },
    bankCode: String
  },
  walletDetails: {
    opayNumber: {
      type: String,
      match: [/^(\+234|0)[789]\d{9}$/, 'Please enter a valid phone number for OPay']
    },
    palmpayNumber: {
      type: String,
      match: [/^(\+234|0)[789]\d{9}$/, 'Please enter a valid phone number for PalmPay']
    }
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'suspended'],
    default: 'pending'
  },
  verificationNotes: String,
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  totalSales: {
    type: Number,
    default: 0
  },
  totalRevenue: {
    type: Number,
    default: 0
  },
  totalProducts: {
    type: Number,
    default: 0
  },
  shippingPolicy: {
    freeShippingThreshold: {
      type: Number,
      default: 0
    },
    shippingFee: {
      type: Number,
      default: 0
    },
    shippingTime: {
      type: String,
      default: '3-7 business days'
    }
  },
  returnPolicy: {
    type: String,
    default: '7 days return policy'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  commission: {
    type: Number,
    default: 10, // 10% commission
    min: 0,
    max: 50
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for better performance
vendorSchema.index({ user: 1 });
vendorSchema.index({ verificationStatus: 1 });
vendorSchema.index({ businessCategory: 1 });
vendorSchema.index({ 'rating.average': -1 });

// Virtual for products
vendorSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'vendor'
});

module.exports = mongoose.model('Vendor', vendorSchema);