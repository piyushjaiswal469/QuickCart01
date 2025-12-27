import React, { useState, useEffect } from "react";
import { IoClose, IoBagHandleOutline, IoChevronForward } from "react-icons/io5";
import "../css/OrderPanel.css";

const API_BASE_URL = "https://quickcart-02mk.onrender.com/api/orders";

export default function OrderPanel({ open, onClose }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) fetchOrders();
  }, [open]);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/myorders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setOrders(data.orders);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (!open) return null;

  return (
    <>
      <div className={`order-overlay ${open ? "open" : ""}`} onClick={onClose}></div>

      <div className={`order-panel ${open ? "open" : ""}`}>
        <div className="op-header">
          <div className="header-left">
            <IoBagHandleOutline size={22} className="text-indigo-600" />
            <h3>Order History</h3>
          </div>
          <button onClick={onClose} className="close-btn">
            <IoClose size={24} />
          </button>
        </div>

        <div className="op-body">
          {loading ? (
            <div className="op-loader-box">
              <div className="spinner"></div>
              <p>Fetching your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="empty-orders">
              <img src="https://cdn-icons-png.flaticon.com/512/10540/10540353.png" alt="Empty" />
              <h4>No orders yet</h4>
              <p>Your previous orders will appear here</p>
              <button className="start-shopping-btn" onClick={onClose}>Shop Now</button>
            </div>
          ) : (
            <div className="op-list">
              {orders.map((order) => (
                <div key={order._id} className="order-card-new">
                  <div className="card-header-row">
                    <div className="order-id-stack">
                      <span className="id-label">ID: #{order._id.slice(-6).toUpperCase()}</span>
                      <span className="order-date-text">{formatDate(order.createdAt)}</span>
                    </div>
                    <span className={`status-pill ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="order-items-scroll">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="mini-item">
                        <span className="mini-qty">{item.quantity} x</span>
                        <span className="mini-name">{item.productName}</span>
                      </div>
                    ))}
                  </div>

                  <div className="card-footer-row">
                    <div className="total-stack">
                      <p>Amount Paid</p>
                      <span className="order-total-val">₹{order.totalAmount}</span>
                    </div>
                    <button className="view-details-btn">
                      Repeat Order <IoChevronForward />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}