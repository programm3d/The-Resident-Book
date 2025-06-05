import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import ImageUpload from "./ImageUpload";
import { addResident } from "../api/residents";

const AddResidentModal = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    profilePhoto: "",
    linkedin: "",
    twitter: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      profilePhoto: imageUrl,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.role) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const newResident = await addResident(formData);
      toast.success("Welcome to the Residents Book! 🎉");
      onSuccess(newResident);
      onClose();
    } catch (error) {
      toast.error("Failed to add resident. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">Add Yourself to the Book</h2>
              <button className="close-btn" onClick={onClose}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label className="form-label">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Title / Role *</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g. Software Engineer"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Profile Photo</label>
                <ImageUpload
                  onImageUpload={handleImageUpload}
                  currentImage={formData.profilePhoto}
                />
              </div>

              <div className="form-group">
                <label className="form-label">LinkedIn URL</label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Twitter URL</label>
                <input
                  type="url"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="https://twitter.com/yourhandle"
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <div
                      className="spinner"
                      style={{ width: "20px", height: "20px" }}
                    ></div>
                    <span>Adding...</span>
                  </>
                ) : (
                  "Add Me"
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddResidentModal;
