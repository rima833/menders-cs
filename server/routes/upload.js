const express = require('express');
const { upload, uploadSingleImage, uploadMultipleImages } = require('../config/cloudinary');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

// @desc    Upload single image
// @route   POST /api/upload/image
// @access  Private
router.post('/image', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No image file provided'
      });
    }

    const result = await uploadSingleImage(req.file.buffer, 'stylemart/images');

    res.status(200).json({
      status: 'success',
      message: 'Image uploaded successfully',
      data: {
        image: result
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Upload multiple images
// @route   POST /api/upload/images
// @access  Private
router.post('/images', upload.array('images', 10), async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No image files provided'
      });
    }

    const results = await uploadMultipleImages(req.files, 'stylemart/images');

    res.status(200).json({
      status: 'success',
      message: 'Images uploaded successfully',
      data: {
        images: results
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;