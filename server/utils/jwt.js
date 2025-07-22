const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// Generate refresh token
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Verify token
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// Send token response
const sendTokenResponse = (user, statusCode, res, message = 'Success') => {
  const token = generateToken(user._id);

  const options = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  // Remove password from output
  user.password = undefined;

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      status: 'success',
      message,
      token,
      data: {
        user
      }
    });
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  sendTokenResponse
};