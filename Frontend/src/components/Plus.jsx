// Plus.jsx
import React, { useState } from "react";

const API_URL = "http://127.0.0.1:5000";

function Plus() {
  const [formData, setFormData] = useState({
    songName: "",
    artist: "",
    album: "",
    releaseDate: "",
    lyrics: "",
  });

  const [audioFile, setAudioFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setCoverPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.songName.trim()) return alert("Song Name is required");
    if (!formData.artist.trim()) return alert("Artist is required");
    if (!audioFile) return alert("Audio file is required");

    setIsUploading(true);

    const data = new FormData();
    data.append("songName", formData.songName.trim());
    // backend expects either artistId or artistName; we pass artistName
    data.append("artistName", formData.artist.trim());
    data.append("album", formData.album.trim());
    data.append("lyrics", formData.lyrics.trim());
    data.append("releaseDate", formData.releaseDate || "");
    data.append("audioFile", audioFile);
    if (coverFile) data.append("coverImage", coverFile);

    try {
      const res = await fetch(`${API_URL}/Plus`, {
        method: "POST",
        body: data,
      });
      const result = await res.json();

      if (res.ok) {
        alert("✅ Song uploaded successfully!");
        console.log(result);

        // Reset form
        setFormData({
          songName: "",
          artist: "",
          album: "",
          releaseDate: "",
          lyrics: "",
        });
        setAudioFile(null);
        setCoverFile(null);
        setCoverPreview(null);
        document
          .querySelectorAll('input[type="file"]')
          .forEach((input) => (input.value = ""));
      } else {
        alert(result.message || "Upload failed");
        console.log(result);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed. Check server console for errors.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <div className="upload-header">
          <div className="back-nav">
            <a href="/" className="back-btn">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
               
              </svg>
              Back to Home
            </a>
          </div>
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18V5l12-2v13M9 13l12-2" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
          <h1>Upload New Song</h1>
          <p>Share your music with the world</p>
        </div>

        <div className="upload-form">
          <div className="form-row">
            <div className="form-group full-width">
              <label>
                Song Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="songName"
                placeholder="Enter song name"
                value={formData.songName}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                Artist Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="artist"
                placeholder="Enter artist name"
                value={formData.artist}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Album</label>
              <input
                type="text"
                name="album"
                placeholder="Enter album name"
                value={formData.album}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Release Date</label>
              <input
                type="date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label>Lyrics</label>
              <textarea
                name="lyrics"
                placeholder="Enter lyrics (optional)"
                value={formData.lyrics}
                onChange={handleChange}
                className="form-textarea"
                rows="3"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                Audio File <span className="required">*</span>
              </label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files[0])}
                  className="file-input"
                  id="audioFile"
                />
                <label htmlFor="audioFile" className="file-label">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                  </svg>
                  {audioFile ? audioFile.name : "Choose audio file"}
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Cover Image</label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverChange}
                  className="file-input"
                  id="coverImage"
                />
                <label htmlFor="coverImage" className="file-label">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  {coverFile ? coverFile.name : "Choose cover image"}
                </label>
              </div>
            </div>
          </div>

          {coverPreview && (
            <div className="preview-container">
              <label>Cover Preview</label>
              <img
                src={coverPreview}
                alt="Cover Preview"
                className="cover-preview"
              />
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="upload-btn"
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <span className="spinner"></span>
                Uploading...
              </>
            ) : (
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Upload Song
              </>
            )}
          </button>
        </div>
      </div>

      <style>
        {`
          .upload-container {
            min-height: 100vh;
            background: linear-gradient(180deg, #1a1a1a 0%, #000000 100%);
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding-top: 30px;
            max-height: calc(100vh - 80px);
            overflow-y: auto;
            overflow-x: hidden;
           
          }
          .upload-container::-webkit-scrollbar {
            width: 8px;
          }
          .upload-container::-webkit-scrollbar-track {
            background: #141414;
          }
          .upload-container::-webkit-scrollbar-thumb {
            background: #2a2a2a;
            border-radius: 8px;
          }

          .upload-card {
            width: 100%;
            max-width: 700px;
            background: rgba(24, 24, 24, 0.95);
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.05);
          }

          .upload-header {
            text-align: center;
            margin-bottom: 24px;
            color: #fff;
            position: relative;
          }

          .back-nav {
            position: absolute;
            left: 0;
            top: 0;
          }

          .back-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #b3b3b3;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.3s ease;
            padding: 8px 12px;
            border-radius: 20px;
          }

          .back-btn:hover {
            color: #1DB954;
            background: rgba(29, 185, 84, 0.1);
          }

          .back-btn svg {
            width: 18px;
            height: 18px;
          }

          .upload-header > svg {
            color: #1DB954;
            margin-bottom: 12px;
          }

          .upload-header h1 {
            font-size: 26px;
            font-weight: 700;
            margin: 0 0 6px 0;
            background: linear-gradient(135deg, #1DB954 0%, #1ed760 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .upload-header p {
            color: #b3b3b3;
            font-size: 14px;
            margin: 0;
          }

          .upload-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }

          .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .form-group.full-width {
            grid-column: 1 / -1;
          }

          .form-group label {
            color: #fff;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 0.5px;
          }

          .required {
            color: #ff4444;
          }

          .form-input,
          .form-textarea {
            width: 100%;
            padding: 12px 14px;
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            color: #fff;
            font-size: 14px;
            transition: all 0.3s ease;
            font-family: inherit;
          }

          .form-input:focus,
          .form-textarea:focus {
            outline: none;
            border-color: #1DB954;
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 0 0 3px rgba(29, 185, 84, 0.1);
          }

          .form-input::placeholder,
          .form-textarea::placeholder {
            color: rgba(255, 255, 255, 0.4);
          }

          .form-textarea {
            resize: vertical;
            min-height: 60px;
          }

          .file-input-wrapper {
            position: relative;
          }

          .file-input {
            display: none;
          }

          .file-label {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 14px;
            background: rgba(255, 255, 255, 0.05);
            border: 2px dashed rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            color: #b3b3b3;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 13px;
          }

          .file-label:hover {
            border-color: #1DB954;
            background: rgba(29, 185, 84, 0.05);
            color: #1DB954;
          }

          .file-label svg {
            flex-shrink: 0;
          }

          .preview-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 16px;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 8px;
          }

          .preview-container label {
            color: #fff;
            font-size: 13px;
            font-weight: 600;
          }

          .cover-preview {
            width: 150px;
            height: 150px;
            object-fit: cover;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          }

          .upload-btn {
            margin-top: 12px;
            padding: 14px;
            background: linear-gradient(135deg, #1DB954 0%, #1ed760 100%);
            border: none;
            border-radius: 50px;
            color: #000;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }

          .upload-btn:hover:not(:disabled) {
            transform: scale(1.02);
            box-shadow: 0 8px 24px rgba(29, 185, 84, 0.4);
          }

          .upload-btn:active:not(:disabled) {
            transform: scale(0.98);
          }

          .upload-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .spinner {
            width: 16px;
            height: 16px;
            border: 3px solid rgba(0, 0, 0, 0.2);
            border-top-color: #000;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          @media (max-width: 768px) {
            .upload-card {
              padding: 24px;
            }

            .form-row {
              grid-template-columns: 1fr;
            }

            .upload-header h1 {
              font-size: 24px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Plus;
