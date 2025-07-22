const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    variant: {
      name: String,
      value: String,
      price: Number
    },
    price: {
      type: Number,
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  coupon: {
    code: String,
    discountType: {
      type: String,
      enum: ['percentage', 'fixed']
    },
    discountValue: Number,
    discountAmount: Number,
    appliedAt: Date
  },
  totals: {
    subtotal: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    shipping: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  },
  shippingAddress: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: {
      type: String,
      default: 'Nigeria'
    }
  },
  notes: String,
  expiresAt: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for automatic cleanup of expired carts
cartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
cartSchema.index({ user: 1 });
cartSchema.index({ 'items.product': 1 });

// Calculate totals before saving
cartSchema.pre('save', function(next) {
  this.calculateTotals();
  next();
});

// Method to calculate cart totals
cartSchema.methods.calculateTotals = function() {
  let subtotal = 0;
  
  this.items.forEach(item => {
    subtotal += item.price * item.quantity;
  });
  
  this.totals.subtotal = subtotal;
  
  // Apply coupon discount
  let discount = 0;
  if (this.coupon && this.coupon.code) {
    if (this.coupon.discountType === 'percentage') {
      discount = (subtotal * this.coupon.discountValue) / 100;
    } else if (this.coupon.discountType === 'fixed') {
      discount = Math.min(this.coupon.discountValue, subtotal);
    }
  }
  this.totals.discount = discount;
  
  // Calculate shipping (this would be more complex in real implementation)
  let shipping = 0;
  const vendorShipping = new Map();
  
  this.items.forEach(item => {
    if (!vendorShipping.has(item.vendor.toString())) {
      vendorShipping.set(item.vendor.toString(), 500); // Base shipping fee per vendor
    }
  });
  
  shipping = Array.from(vendorShipping.values()).reduce((sum, fee) => sum + fee, 0);
  this.totals.shipping = shipping;
  
  // Calculate tax (7.5% VAT in Nigeria)
  const tax = (subtotal - discount) * 0.075;
  this.totals.tax = tax;
  
  // Calculate total
  this.totals.total = subtotal - discount + shipping + tax;
};

// Method to add item to cart
cartSchema.methods.addItem = function(productId, vendorId, quantity = 1, variant = null, price) {
  const existingItemIndex = this.items.findIndex(item => 
    item.product.toString() === productId.toString() &&
    (!variant || (item.variant && item.variant.value === variant.value))
  );
  
  if (existingItemIndex > -1) {
    this.items[existingItemIndex].quantity += quantity;
  } else {
    this.items.push({
      product: productId,
      vendor: vendorId,
      quantity,
      variant,
      price,
      addedAt: new Date()
    });
  }
  
  this.calculateTotals();
};

// Method to remove item from cart
cartSchema.methods.removeItem = function(itemId) {
  this.items = this.items.filter(item => item._id.toString() !== itemId.toString());
  this.calculateTotals();
};

// Method to update item quantity
cartSchema.methods.updateQuantity = function(itemId, quantity) {
  const item = this.items.find(item => item._id.toString() === itemId.toString());
  if (item) {
    if (quantity <= 0) {
      this.removeItem(itemId);
    } else {
      item.quantity = quantity;
      this.calculateTotals();
    }
  }
};

// Method to clear cart
cartSchema.methods.clearCart = function() {
  this.items = [];
  this.coupon = undefined;
  this.calculateTotals();
};

// Virtual for item count
cartSchema.virtual('itemCount').get(function() {
  return this.items.reduce((total, item) => total + item.quantity, 0);
});

module.exports = mongoose.model('Cart', cartSchema);