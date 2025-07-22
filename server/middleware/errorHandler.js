const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  console.error('Error:', err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = {
      message,
      status: 'error',
      statusCode: 404
    };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    let message = 'Duplicate field value entered';
    
    // Extract field name from error
    const field = Object.keys(err.keyValue)[0];
    if (field === 'email') {
      message = 'Email address is already registered';
    } else if (field === 'phone') {
      message = 'Phone number is already registered';
    } else if (field === 'sku') {
      message = 'Product SKU already exists';
    }
    
    error = {
      message,
      status: 'error',
      statusCode: 400
    };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(error => error.message).join(', ');
    error = {
      message,
      status: 'error',
      statusCode: 400
    };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = {
      message,
      status: 'error',
      statusCode: 401
    };
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = {
      message,
      status: 'error',
      statusCode: 401
    };
  }

  // File upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    const message = 'File size too large';
    error = {
      message,
      status: 'error',
      statusCode: 400
    };
  }

  if (err.code === 'LIMIT_FILE_COUNT') {
    const message = 'Too many files uploaded';
    error = {
      message,
      status: 'error',
      statusCode: 400
    };
  }

  // Payment errors
  if (err.message && err.message.includes('payment')) {
    error = {
      message: err.message,
      status: 'error',
      statusCode: 400
    };
  }

  res.status(error.statusCode || 500).json({
    status: error.status || 'error',
    message: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;