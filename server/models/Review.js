const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
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
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  title: {
    type: String,
    trim: true,
    maxlength: [100, 'Review title cannot exceed 100 characters']
  },
  comment: {
    type: String,
    required: [true, 'Review comment is required'],
    trim: true,
    maxlength: [1000, 'Review comment cannot exceed 1000 characters']
  },
  images: [{
    url: String,
    altText: String
  }],
  helpful: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    helpful: {
      type: Boolean,
      required: true
    }
  }],
  helpfulCount: {
    type: Number,
    default: 0
  },
  notHelpfulCount: {
    type: Number,
    default: 0
  },
  isVerifiedPurchase: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'approved'
  },
  vendorResponse: {
    comment: String,
    respondedAt: Date,
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Compound index to ensure one review per user per product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });
reviewSchema.index({ product: 1 });
reviewSchema.index({ vendor: 1 });
reviewSchema.index({ rating: -1 });
reviewSchema.index({ createdAt: -1 });

// Update product rating when review is saved
reviewSchema.post('save', async function() {
  await this.updateProductRating();
});

// Update product rating when review is removed
reviewSchema.post('remove', async function() {
  await this.updateProductRating();
});

// Method to update product rating
reviewSchema.methods.updateProductRating = async function() {
  const Product = mongoose.model('Product');
  const Review = mongoose.model('Review');
  
  const stats = await Review.aggregate([
    { $match: { product: this.product, status: 'approved' } },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);
  
  if (stats.length > 0) {
    const { averageRating, totalReviews } = stats[0];
    await Product.findByIdAndUpdate(this.product, {
      'rating.average': Math.round(averageRating * 10) / 10,
      'rating.count': totalReviews
    });
  } else {
    await Product.findByIdAndUpdate(this.product, {
      'rating.average': 0,
      'rating.count': 0
    });
  }
};

module.exports = mongoose.model('Review', reviewSchema);