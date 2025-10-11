  import React, { useState } from "react";
  import api from "../utils/axiosInstance";

  const MultiUpload = (props) => {
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [progress, setProgress] = useState({});
    const [uploaded, setUploaded] = useState([]);
    const [productId, setProductId] = useState("");

    // Select files and show preview
    const handleSelect = (e) => {
      const files = Array.from(e.target.files);
      setImages(files);

      const previewUrls = files.map((file) => URL.createObjectURL(file));
      setPreviews(previewUrls);
    };

    // Upload to backend
    const handleUpload = async () => {
      if (!productId || images.length === 0) {
        alert("Please select images and provide a Product ID");
        return;
      }

      const formData = new FormData();
      formData.append("productId", productId);
      images.forEach((file) => formData.append("images", file));

      try {
        const response = await api.post("/upload/multi", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded / e.total) * 100);
            setProgress({ overall: percent });
          },
        });

        if (props.onUploadComplete) {
    props.onUploadComplete(response.data.product.images);
  }
        setUploaded(response.data.product.images);
        alert("Images uploaded successfully!");
      } catch (error) {
        console.error(error);
        alert("Upload failed");
      }
    };

    return (
      <div style={{ maxWidth: 600, margin: "2rem auto", padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
        <h2 style={{ textAlign: "center" }}>📸 Multi-Image Upload</h2>

        <input
          type="text"
          placeholder="Enter Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />

        <input type="file" multiple onChange={handleSelect} style={{ marginBottom: 12 }} />

        {/* Preview */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {previews.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="preview"
              width={100}
              height={100}
              style={{ objectFit: "cover", borderRadius: 8 }}
            />
          ))}
        </div>

        {progress.overall && (
          <p style={{ marginTop: 10 }}>Upload Progress: {progress.overall}%</p>
        )}

        <button
          onClick={handleUpload}
          style={{
            background: "#007bff",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: 6,
            cursor: "pointer",
            marginTop: 12,
          }}
        >
          Upload
        </button>

        {uploaded.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <h3>☁️ Uploaded Cloudinary URLs</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {uploaded.map((url, i) => (
                <a href={url} target="_blank" rel="noreferrer" key={i}>
                  <img
                    src={url}
                    alt={`uploaded-${i}`}
                    width={100}
                    height={100}
                    style={{ borderRadius: 8 }}
                  />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  export default MultiUpload;
