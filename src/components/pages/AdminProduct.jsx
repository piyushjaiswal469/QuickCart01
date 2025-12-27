import React, { useState, useEffect } from "react";
import { Upload, LayoutList, CheckCircle, AlertCircle, IndianRupee, Package, Clock, Scale, ChevronDown, Tag, Image as ImageIcon, ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { capitalizeWords } from "../../utils/camelCase";
import "../css/AdminAddModal.css";

const AdminProduct = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [existingCategories, setExistingCategories] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const productToEdit = location.state?.productToEdit;
  const isEditMode = !!productToEdit;

  const initialProductState = {
    name: "", brand: "QuickCart", weight: "", price: "", mrp: "", image: "", time: "10 MINS", category: "",
  };
  const [prodFormData, setProdFormData] = useState(initialProductState);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://quickcart-02mk.onrender.com/api/category");
        const data = await res.json();
        setExistingCategories(data.categories || data);
      } catch (error) { console.error("Error:", error); }
    };
    fetchCategories();

    if (isEditMode && productToEdit) {
      setProdFormData({
        ...productToEdit,
        category: typeof productToEdit.category === "object" ? productToEdit.category._id : productToEdit.category,
      });
    }
  }, [isEditMode, productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProdFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = isEditMode ? `https://quickcart-02mk.onrender.com/api/products/${productToEdit._id}` : "https://quickcart-02mk.onrender.com/api/products";
      const method = isEditMode ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prodFormData),
      });
      if ((await res.json()).success) {
        setStatus({ type: "success", message: `Product ${isEditMode ? 'updated' : 'added'} successfully!` });
        setTimeout(() => navigate("/dashboard/all-products"), 1500);
      }
    } catch (err) { setStatus({ type: "error", message: "Operation failed" }); }
    finally { setLoading(false); }
  };

  return (
    <div className="admin-editor-wrapper">
      {/* Header with Back Button */}
      <div className="editor-header">
        <button className="back-btn" onClick={() => navigate(-1)}><ArrowLeft size={20} /></button>
        <div>
          <h1>{isEditMode ? "Update Product" : "Create New Product"}</h1>
          <p>Fill in the details to {isEditMode ? "edit" : "list"} your item in the marketplace</p>
        </div>
      </div>

      <form className="editor-layout" onSubmit={handleSubmit}>
        {/* LEFT COLUMN: Main Info */}
        <div className="editor-main">
          <div className="editor-card">
            <h3>General Information</h3>
            <div className="form-group">
              <label>Product Title <span className="req">*</span></label>
              <div className="input-with-icon">
                <Package size={18} />
                <input type="text" name="name" required value={prodFormData.name} onChange={handleChange} placeholder="e.g. Organic Alphanso Mangoes" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category <span className="req">*</span></label>
                <div className="input-with-icon">
                  <LayoutList size={18} />
                  <select name="category" required value={prodFormData.category} onChange={handleChange}>
                    <option value="">Select Category</option>
                    {existingCategories.map(cat => <option key={cat._id} value={cat._id}>{capitalizeWords(cat.name)}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Brand</label>
                <div className="input-with-icon">
                  <Tag size={18} />
                  <input type="text" name="brand" value={prodFormData.brand} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>

          <div className="editor-card">
            <h3>Pricing & Logistics</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Price (Selling) <span className="req">*</span></label>
                <div className="input-with-icon">
                  <IndianRupee size={18} />
                  <input type="number" name="price" required value={prodFormData.price} onChange={handleChange} placeholder="0.00" />
                </div>
              </div>
              <div className="form-group">
                <label>MRP (Original)</label>
                <div className="input-with-icon">
                  <IndianRupee size={18} />
                  <input type="number" name="mrp" value={prodFormData.mrp} onChange={handleChange} placeholder="0.00" />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Weight/Unit <span className="req">*</span></label>
                <div className="input-with-icon">
                  <Scale size={18} />
                  <input type="text" name="weight" required value={prodFormData.weight} onChange={handleChange} placeholder="e.g. 500g" />
                </div>
              </div>
              <div className="form-group">
                <label>Delivery Time</label>
                <div className="input-with-icon">
                  <Clock size={18} />
                  <input type="text" name="time" value={prodFormData.time} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Media & Action */}
        <div className="editor-side">
          <div className="editor-card">
            <h3>Product Media</h3>
            <div className="image-preview-box">
              {prodFormData.image ? (
                <img src={prodFormData.image} alt="Preview" className="preview-img" />
              ) : (
                <div className="preview-placeholder">
                  <ImageIcon size={40} />
                  <span>No image URL provided</span>
                </div>
              )}
            </div>
            <div className="form-group mt-4">
              <label>Image URL <span className="req">*</span></label>
              <div className="input-with-icon">
                <Upload size={18} />
                <input type="url" name="image" required value={prodFormData.image} onChange={handleChange} placeholder="https://cdn..." />
              </div>
            </div>
          </div>

          <div className="editor-actions">
            {status.message && (
              <div className={`status-pill ${status.type}`}>
                {status.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                {status.message}
              </div>
            )}
            <button type="submit" disabled={loading} className="save-btn">
              {loading ? "Processing..." : isEditMode ? "Save Changes" : "Publish Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminProduct;