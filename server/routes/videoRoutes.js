const express = require('express');
const multer = require('multer');
const path = require('path');
const Video = require('../models/Video');

const router = express.Router();

// Configure Multer storage to store uploads in server/uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    // Append a timestamp to the original filename to avoid collisions
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000 * 1024 * 1024 }, // Limit file size to ~1GB
});

/**
 * GET /api/videos
 *
 * Retrieve all videos sorted by creation date (newest first).
 */
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch videos' });
  }
});

/**
 * POST /api/videos
 *
 * Upload a new video. Expects a multipart/form-data request with
 * the video file under the field name "video", along with "title"
 * and optional "description" fields.
 */
router.post('/', upload.single('video'), async (req, res) => {
  const { title, description } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: 'No video file uploaded' });
  }

  const filePath = `/uploads/${req.file.filename}`;

  const video = new Video({
    title,
    description,
    filePath,
  });

  try {
    const created = await video.save();
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to create video' });
  }
});

/**
 * PUT /api/videos/:id/like
 *
 * Increment the like count for a specific video.
 */
router.put('/:id/like', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    video.likes += 1;
    await video.save();
    res.json(video);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to like video' });
  }
});

module.exports = router;