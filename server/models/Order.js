const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
    name: String,
    image: String,
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    variant: {
      name: String,
      value: String
    },
    sku: String,
    subtotal: {
      type: Number,
      required: true
    }
  }],
  pricing: {
    subtotal: {
      type: Number,
      required: true
    },
    shippingFee: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      required: true
    }
  },
  shippingAddress: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
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
  billingAddress: {
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
    },
    sameAsShipping: {
      type: Boolean,
      default: true
    }
  },
  payment: {
    method: {
      type: String,
      enum: ['card', 'bank_transfer', 'opay', 'palmpay', 'ussd', 'paystack', 'flutterwave'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded', 'partially_refunded'],
      default: 'pending'
    },
    transactionId: String,
    paymentReference: String,
    paidAt: Date,
    amount: Number,
    currency: {
      type: String,
      default: 'NGN'
    },
    gatewayResponse: Object
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'pending'
  },
  fulfillment: [{
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true
    },
    items: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: Number,
      price: Number
    }],
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
    },
    tracking: {
      trackingNumber: String,
      carrier: String,
      trackingUrl: String,
      shippedAt: Date,
      deliveredAt: Date,
      estimatedDelivery: Date
    },
    subtotal: Number,
    shippingFee: Number,
    commission: Number
  }],
  notes: {
    customer: String,
    vendor: String,
    admin: String
  },
  coupon: {
    code: String,
    discountType: {
      type: String,
      enum: ['percentage', 'fixed']
    },
    discountValue: Number,
    discountAmount: Number
  },
  timeline: [{
    status: String,
    note: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  isGift: {
    type: Boolean,
    default: false
  },
  giftMessage: String,
  estimatedDeliveryDate: Date,
  deliveredAt: Date,
  cancelledAt: Date,
  cancelReason: String,
  refundAmount: {
    type: Number,
    default: 0
  },
  refundReason: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate order number before saving
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `SM${Date.now()}${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

// Indexes for better performance
orderSchema.index({ user: 1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ 'payment.status': 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ 'items.vendor': 1 });

// Virtual for vendor orders
orderSchema.virtual('vendorOrders').get(function() {
  const vendorMap = new Map();
  
  this.items.forEach(item => {
    const vendorId = item.vendor.toString();
    if (!vendorMap.has(vendorId)) {
      vendorMap.set(vendorId, {
        vendor: item.vendor,
        items: [],
        subtotal: 0
      });
    }
    
    const vendorOrder = vendorMap.get(vendorId);
    vendorOrder.items.push(item);
    vendorOrder.subtotal += item.subtotal;
  });
  
  return Array.from(vendorMap.values());
});

module.exports = mongoose.model('Order', orderSchema);