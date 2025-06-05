import React, { useState, useRef } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import { toast } from "react-hot-toast";

const ImageUpload = ({ onImageUpload, currentImage }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage);
  const fileInputRef = useRef(null);

  const CLOUDINARY_UPLOAD_PRESET = "residents-book"; 
  const CLOUDINARY_CLOUD_NAME = "djid9duyu"; 
  const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      uploadToCloudinary(file);
    }
  };

  const uploadToCloudinary = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "residents-book");

    try {
      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      const imageUrl = data.secure_url;

      setPreview(imageUrl);
      onImageUpload(imageUrl);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setPreview("");
    onImageUpload("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="image-upload-container">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />

      {!preview ? (
        <div
          className="image-upload-area"
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? (
            <div className="spinner" style={{ margin: "0 auto" }}></div>
          ) : (
            <>
              <div className="upload-icon">
                <FiUpload />
              </div>
              <p className="upload-text">Click to upload photo</p>
              <p className="upload-subtext">PNG, JPG up to 5MB</p>
            </>
          )}
        </div>
      ) : (
        <div className="image-preview">
          <img src={preview} alt="Profile preview" className="preview-image" />
          <button type="button" className="remove-image" onClick={removeImage}>
            <FiX size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
