import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit, MdLocationOn, MdHome, MdWork, MdMap } from "react-icons/md";
import { IoClose, IoAddCircleOutline } from "react-icons/io5";
import "../css/AddressPanel.css";

const API_BASE_URL = "http://localhost:5000/api/user";

export default function AddressPanel({ open, onClose }) {
  const [addresses, setAddresses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [view, setView] = useState("LIST");
  const [loading, setLoading] = useState(false);

  const [newAddress, setNewAddress] = useState({
    label: "Home",
    addressLine: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    if (open) fetchAddresses();
  }, [open]);

  const fetchAddresses = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setAddresses(data.user.savedAddresses || []);
    } catch (err) { console.error(err); }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!newAddress.addressLine.trim()) tempErrors.addressLine = "Address line is required";
    if (!newAddress.city.trim()) tempErrors.city = "City is required";
    if (newAddress.pincode.length !== 6) tempErrors.pincode = "Pincode must be 6 digits";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    const token = localStorage.getItem("token");
    setLoading(true);
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_BASE_URL}/address/${editingId}` : `${API_BASE_URL}/address`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ address: { ...newAddress, location: { type: "Point", coordinates: [0, 0] } } }),
      });
      const data = await res.json();
      if (data.success) {
        setAddresses(data.addresses);
        resetForm();
      }
    } catch (err) { alert("Error saving address"); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Remove this address?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE_URL}/address/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setAddresses(data.addresses);
    } catch (err) { console.error(err); }
  };

  const resetForm = () => {
    setView("LIST");
    setEditingId(null);
    setErrors({});
    setNewAddress({ label: "Home", addressLine: "", city: "", pincode: "" });
  };

  const getLabelIcon = (label) => {
    if (label === "Home") return <MdHome size={18} />;
    if (label === "Work") return <MdWork size={18} />;
    return <MdMap size={18} />;
  };

  if (!open) return null;

  return (
    <>
      <div className={`address-overlay ${open ? "open" : ""}`} onClick={onClose}></div>
      <div className={`address-panel ${open ? "open" : ""}`}>
        <div className="ap-header">
          <div className="header-left">
            <MdLocationOn size={22} className="text-emerald-600" />
            <h3>{view === "LIST" ? "Saved Addresses" : editingId ? "Edit Address" : "Add New Address"}</h3>
          </div>
          <button onClick={onClose} className="close-btn"><IoClose size={24} /></button>
        </div>

        <div className="ap-body">
          {view === "LIST" ? (
            <div className="ap-content">
              <button className="ap-add-card-btn" onClick={() => setView("FORM")}>
                <IoAddCircleOutline size={20} />
                <span>Add a new delivery address</span>
              </button>

              <div className="ap-list-scroll">
                {addresses.length === 0 ? (
                  <div className="empty-address">
                    <img src="https://cdn-icons-png.flaticon.com/512/12108/12108157.png" alt="Empty" />
                    <p>No addresses found</p>
                  </div>
                ) : (
                  addresses.map((addr) => (
                    <div key={addr._id} className="address-card-new">
                      <div className="addr-header">
                        <div className="addr-tag">
                          {getLabelIcon(addr.label)}
                          <span>{addr.label}</span>
                        </div>
                        <div className="addr-actions">
                          <button onClick={() => { setEditingId(addr._id); setNewAddress(addr); setView("FORM"); }}><MdEdit /></button>
                          <button className="del" onClick={() => handleDelete(addr._id)}><MdDelete /></button>
                        </div>
                      </div>
                      <p className="addr-text">{addr.addressLine}, {addr.city} - {addr.pincode}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="ap-form-container">
              <div className="type-pill-selector">
                {["Home", "Work", "Other"].map((type) => (
                  <button
                    key={type}
                    className={`type-pill ${newAddress.label === type ? "active" : ""}`}
                    onClick={() => setNewAddress({ ...newAddress, label: type })}
                  >
                    {getLabelIcon(type)} {type}
                  </button>
                ))}
              </div>

              <div className="form-group-new">
                <label>Address Details</label>
                <textarea
                  className={errors.addressLine ? "error" : ""}
                  placeholder="House No, Building Name, Street..."
                  value={newAddress.addressLine}
                  onChange={(e) => setNewAddress({ ...newAddress, addressLine: e.target.value })}
                />
                {errors.addressLine && <span className="err-txt">{errors.addressLine}</span>}
              </div>

              <div className="form-row-new">
                <div className="form-group-new">
                  <label>City</label>
                  <input
                    type="text"
                    className={errors.city ? "error" : ""}
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  />
                </div>
                <div className="form-group-new">
                  <label>Pincode</label>
                  <input
                    type="text"
                    maxLength={6}
                    className={errors.pincode ? "error" : ""}
                    value={newAddress.pincode}
                    onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value.replace(/\D/g, "") })}
                  />
                </div>
              </div>
              
              <div className="ap-footer">
                <button className="ap-save-btn-new" onClick={handleSave} disabled={loading}>
                  {loading ? "Saving..." : editingId ? "Update Address" : "Save Address"}
                </button>
                <button className="ap-cancel-btn-new" onClick={resetForm}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}