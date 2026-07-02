import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use memory storage — we'll upload to Cloudinary manually
const storage = multer.memoryStorage();

export const upload = multer({ storage: storage });

// Direct upload function using Cloudinary's native API
export const uploadToCloudinary = (fileBuffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'dhebronix',
        public_id: filename,
        transformation: [{ width: 1200, height: 1200, crop: 'limit' }]
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

export { cloudinary };