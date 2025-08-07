const mongoose = require('mongoose');

/**
 * Schema for a video document.
 *
 * title       – Required title of the video.
 * description – Optional description.
 * filePath    – Path to the uploaded file on disk.
 * likes       – Number of likes the video has received.
 * createdAt   – Timestamp for when the video was created.
 */
const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Video', videoSchema);