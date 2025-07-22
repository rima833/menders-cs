const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration for file upload
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Check file type
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 10 // Maximum 10 files
  }
});

// Upload single image to Cloudinary
const uploadSingleImage = async (buffer, folder = 'stylemart') => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder,
      public_id: `${folder}_${uuidv4()}`,
      resource_type: 'auto',
      transformation: [
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    };

    cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format
          });
        }
      }
    ).end(buffer);
  });
};

// Upload multiple images to Cloudinary
const uploadMultipleImages = async (files, folder = 'stylemart') => {
  const uploadPromises = files.map(file => 
    uploadSingleImage(file.buffer, folder)
  );
  
  return Promise.all(uploadPromises);
};

// Delete image from Cloudinary
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

// Delete multiple images from Cloudinary
const deleteMultipleImages = async (publicIds) => {
  try {
    const result = await cloudinary.api.delete_resources(publicIds);
    return result;
  } catch (error) {
    console.error('Error deleting multiple images:', error);
    throw error;
  }
};

// Generate optimized image URL
const getOptimizedImageUrl = (publicId, options = {}) => {
  const {
    width = 'auto',
    height = 'auto',
    crop = 'fill',
    quality = 'auto',
    format = 'auto'
  } = options;

  return cloudinary.url(publicId, {
    width,
    height,
    crop,
    quality,
    fetch_format: format,
    secure: true
  });
};

// Image transformation presets
const imagePresets = {
  thumbnail: { width: 150, height: 150, crop: 'fill' },
  small: { width: 300, height: 300, crop: 'fit' },
  medium: { width: 600, height: 600, crop: 'fit' },
  large: { width: 1200, height: 1200, crop: 'fit' },
  banner: { width: 1200, height: 400, crop: 'fill' }
};

module.exports = {
  cloudinary,
  upload,
  uploadSingleImage,
  uploadMultipleImages,
  deleteImage,
  deleteMultipleImages,
  getOptimizedImageUrl,
  imagePresets
};