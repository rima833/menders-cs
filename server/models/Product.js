const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Product description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [500, 'Short description cannot exceed 500 characters']
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
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
  subcategory: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  comparePrice: {
    type: Number,
    min: [0, 'Compare price cannot be negative']
  },
  costPrice: {
    type: Number,
    min: [0, 'Cost price cannot be negative']
  },
  currency: {
    type: String,
    default: 'NGN'
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    altText: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  variants: [{
    name: String, // e.g., "Size", "Color"
    options: [{
      value: String, // e.g., "Large", "Red"
      price: Number,
      stock: Number,
      sku: String,
      image: String
    }]
  }],
  inventory: {
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative']
    },
    lowStockThreshold: {
      type: Number,
      default: 5
    },
    trackQuantity: {
      type: Boolean,
      default: true
    },
    allowBackorder: {
      type: Boolean,
      default: false
    }
  },
  sku: {
    type: String,
    unique: true,
    sparse: true
  },
  barcode: String,
  weight: {
    value: Number,
    unit: {
      type: String,
      enum: ['kg', 'g', 'lb', 'oz'],
      default: 'kg'
    }
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: {
      type: String,
      enum: ['cm', 'm', 'in', 'ft'],
      default: 'cm'
    }
  },
  shipping: {
    freeShipping: {
      type: Boolean,
      default: false
    },
    shippingFee: {
      type: Number,
      default: 0
    },
    shippingClass: String
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'inactive', 'archived'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
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
  views: {
    type: Number,
    default: 0
  },
  isDigital: {
    type: Boolean,
    default: false
  },
  downloadableFiles: [{
    name: String,
    url: String,
    size: Number
  }],
  specifications: [{
    name: String,
    value: String
  }],
  warranty: {
    duration: String,
    details: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create slug from name before saving
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

// Indexes for better performance
productSchema.index({ vendor: 1 });
productSchema.index({ category: 1 });
productSchema.index({ status: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ price: 1 });
productSchema.index({ 'rating.average': -1 });
productSchema.index({ totalSales: -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

// Virtual for reviews
productSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product'
});

// Virtual for primary image
productSchema.virtual('primaryImage').get(function() {
  const primary = this.images.find(img => img.isPrimary);
  return primary ? primary.url : (this.images[0] ? this.images[0].url : null);
});

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.comparePrice && this.comparePrice > this.price) {
    return Math.round(((this.comparePrice - this.price) / this.comparePrice) * 100);
  }
  return 0;
});

module.exports = mongoose.model('Product', productSchema);