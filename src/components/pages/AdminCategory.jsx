import React, { useState } from "react";
import {
  Upload,
  Type,
  LayoutList,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
  ArrowLeft,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../css/AdminAddModal.css";

const AdminCategory = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  const initialCategoryState = {
    name: "",
    image: "",
    alt: "",
    priority: 0,
    isActive: true,
  };
  const [catFormData, setCatFormData] = useState(initialCategoryState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = type === "checkbox" ? checked : value;

    if (name === "priority") {
      val = val === "" ? "" : Math.min(Math.max(parseInt(val, 10) || 0, 0), 5);
    }
    setCatFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("https://quickcart-02mk.onrender.com/api/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(catFormData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({
          type: "success",
          message: "Category published successfully!",
        });
        setCatFormData(initialCategoryState);
        // Optional: Redirect to category list after success
        // setTimeout(() => navigate("/dashboard/all-categories"), 1500);
      } else {
        throw new Error(data.message || "Operation failed");
      }
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-editor-wrapper">
      {/* Header Section */}
      <div className="editor-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1>Create New Category</h1>
          <p>Organize your products by defining a new store section</p>
        </div>
      </div>

      <form className="editor-layout" onSubmit={handleSubmit}>
        {/* LEFT COLUMN: Main Info */}
        <div className="editor-main">
          <div className="editor-card">
            <h3>General Information</h3>
            <div className="form-group">
              <label>
                Category Name <span className="req">*</span>
              </label>
              <div className="input-with-icon">
                <Type size={18} />
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="off"
                  value={catFormData.name}
                  onChange={handleChange}
                  placeholder="e.g., Dairy, Bread & Eggs"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Alt Text (SEO)</label>
              <div className="input-with-icon">
                <ImageIcon size={18} />
                <input
                  type="text"
                  name="alt"
                  autoComplete="off"
                  value={catFormData.alt}
                  onChange={handleChange}
                  placeholder="Describe the category image"
                />
              </div>
            </div>
          </div>

          <div className="editor-card">
            <h3>Configuration & Visibility</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Sort Priority (0-5)</label>
                <div className="input-with-icon">
                  <LayoutList size={18} />
                  <input
                    type="number"
                    name="priority"
                    min="0"
                    max="5"
                    value={catFormData.priority}
                    onChange={handleChange}
                  />
                </div>
                <p className="help-text">Higher numbers appear first in lists.</p>
              </div>

              <div className="form-group">
                <label>Status</label>
                <div className="toggle-wrapper" style={{ paddingTop: "8px" }}>
                  <label className="toggle-label">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={catFormData.isActive}
                      onChange={handleChange}
                      className="toggle-checkbox"
                    />
                    <div className="toggle-track">
                      <div className="toggle-thumb"></div>
                    </div>
                    <span className="toggle-text">
                      {catFormData.isActive ? "Visible in Store" : "Hidden"}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Media & Action */}
        <div className="editor-side">
          <div className="editor-card">
            <h3>Category Icon</h3>
            <div className="image-preview-box">
              {catFormData.image ? (
                <img
                  src={catFormData.image}
                  alt="Preview"
                  className="preview-img"
                />
              ) : (
                <div className="preview-placeholder">
                  <ImageIcon size={40} />
                  <span>Image preview will appear here</span>
                </div>
              )}
            </div>
            <div className="form-group mt-4">
              <label>
                Icon URL <span className="req">*</span>
              </label>
              <div className="input-with-icon">
                <Upload size={18} />
                <input
                  type="url"
                  name="image"
                  required
                  value={catFormData.image}
                  onChange={handleChange}
                  placeholder="https://cdn.example.com/image.png"
                />
              </div>
            </div>
          </div>

          <div className="editor-actions">
            {status.message && (
              <div className={`status-pill ${status.type}`}>
                {status.type === "success" ? (
                  <CheckCircle size={16} />
                ) : (
                  <AlertCircle size={16} />
                )}
                {status.message}
              </div>
            )}
            <button type="submit" disabled={loading} className="save-btn">
              {loading ? "Processing..." : "Publish Category"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminCategory;