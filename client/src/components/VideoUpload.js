import React, { useState } from 'react';

/**
 * Form component for uploading videos.
 *
 * Accepts a file, title and description and passes the form data
 * back to the parent component via the onUpload callback.
 */
function VideoUpload({ onUpload }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !title) {
      alert('Please provide at least a title and select a video file.');
      return;
    }
    const formData = new FormData();
    formData.append('video', file);
    formData.append('title', title);
    formData.append('description', description);
    onUpload(formData);
    // Reset form fields
    setTitle('');
    setDescription('');
    setFile(null);
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <h2>Upload a Video</h2>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title"
        />
      </div>
      <div className="form-group">
        <label>Description (optional)</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a description"
        />
      </div>
      <div className="form-group">
        <label>Select Video</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
}

export default VideoUpload;