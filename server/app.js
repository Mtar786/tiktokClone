/**
 * Main entry point for the Express server.
 *
 * This file configures middleware, connects to MongoDB and registers
 * API routes for working with videos.
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Load environment variables from .env file if present
require('dotenv').config();

const videoRoutes = require('./routes/videoRoutes');

const app = express();

// Enable CORS for all origins (for development)
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve uploaded videos statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Register API routes
app.use('/api/videos', videoRoutes);

// Determine connection settings
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tiktok_clone';

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });