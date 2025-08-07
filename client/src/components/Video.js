import React from 'react';

/**
 * Single video component.
 *
 * Displays the video player, title, description and like button.
 */
function Video({ video, onLike }) {
  return (
    <div className="video-item">
      <video
        src={`http://localhost:5000${video.filePath}`}
        controls
        width="100%"
      >
        Your browser does not support the video tag.
      </video>
      <div className="video-details">
        <h3>{video.title}</h3>
        {video.description && <p>{video.description}</p>}
        <button className="like-button" onClick={onLike}>
          ❤️ {video.likes}
        </button>
      </div>
    </div>
  );
}

export default Video;