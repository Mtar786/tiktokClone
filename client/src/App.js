import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Video from './components/Video';
import VideoUpload from './components/VideoUpload';

/**
 * Main application component.
 *
 * Fetches videos from the server, allows users to upload new videos
 * and like existing ones.
 */
function App() {
  const [videos, setVideos] = useState([]);
  const API_BASE = 'http://localhost:5000/api/videos';

  // Fetch all videos from the server
  const fetchVideos = async () => {
    try {
      const response = await axios.get(API_BASE);
      setVideos(response.data);
    } catch (err) {
      console.error('Failed to fetch videos', err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Handle liking a video
  const handleLike = async (id) => {
    try {
      await axios.put(`${API_BASE}/${id}/like`);
      // Update list after like
      fetchVideos();
    } catch (err) {
      console.error('Failed to like video', err);
    }
  };

  // Handle uploading a new video
  const handleUpload = async (formData) => {
    try {
      await axios.post(API_BASE, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Refresh feed after upload
      fetchVideos();
    } catch (err) {
      console.error('Failed to upload video', err);
    }
  };

  return (
    <div className="container">
      <h1>TikTok Clone</h1>
      <VideoUpload onUpload={handleUpload} />
      <div className="feed">
        {videos.map((video) => (
          <Video
            key={video._id}
            video={video}
            onLike={() => handleLike(video._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;