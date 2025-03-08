import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

function App() {
  const [files, setFiles] = useState([]);
  const [format, setFormat] = useState("jpeg");
  const [downloadLink, setDownloadLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const isValid = selectedFiles.every(file => file.size <= 5 * 1024 * 1024);

    if (!isValid) {
      setError("Each file must be less than 5MB.");
      return;
    }

    setFiles(selectedFiles);
    setError("");
  };

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select files.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    files.forEach(file => formData.append("images", file));
    formData.append("format", format);

    try {
      const response = await axios.post("http://127.0.0.1:5000/convert", formData, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadLink(url);
    } catch (error) {
      setError("Conversion failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="app-box">
        <h1 className="title">Image Format Converter</h1>
        
        <input type="file" multiple onChange={handleFileChange} className="file-input" />
        
        {error && <p className="error-message">{error}</p>}

        <select onChange={handleFormatChange} value={format} className="format-select">
          <option value="jpeg">JPEG</option>
          <option value="png">PNG</option>
          <option value="bmp">BMP</option>
          <option value="gif">GIF</option>
          <option value="tiff">TIFF</option>
          <option value="webp">WEBP</option>
        </select>
        
        <button 
          onClick={handleUpload} 
          className="convert-button"
          disabled={loading}
        >
          {loading ? "Converting..." : "Convert"}
        </button>

        {downloadLink && (
          <div className="download-section">
            <h3 className="download-title">Download Converted Files:</h3>
            <a
              href={downloadLink}
              download="converted_images.zip"
              className="download-link"
            >
              Click to Download ZIP
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
