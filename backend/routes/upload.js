import express from 'express';
import { upload } from '../config/cloudinaryConfig.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/image', authenticateAdmin, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }
    res.json({
      success: true,
      url: req.file.path,
      public_id: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

router.post('/multiple', authenticateAdmin, upload.array('images', 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No images uploaded' });
    }
    const urls = req.files.map(file => ({
      url: file.path,
      public_id: file.filename
    }));
    res.json({ success: true, images: urls });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

export default router;