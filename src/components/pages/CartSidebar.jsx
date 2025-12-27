import React from "react";
import { IoClose, IoBagCheckOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import { useCart } from "../../context/CartContext";
import "../css/CartSidebar.css";

const CartSidebar = ({ isOpen, onClose, onCheckout }) => {
  const { cartItems, addToCart, removeFromCart, cartTotal } = useCart();

  return (
    <>
      <div className={`cart-overlay ${isOpen ? "open" : ""}`} onClick={onClose}></div>

      <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <div className="header-left">
            <IoBagCheckOutline size={22} className="text-emerald-600" />
            <h3>Checkout Cart</h3>
          </div>
          <button onClick={onClose} className="close-btn">
            <IoClose size={24} />
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-animation-box">
                 <img src="https://cdn.grofers.com/assets/ui/empty_states/emp_empty_cart.png" alt="Empty" />
              </div>
              <h4>Your cart feels light</h4>
              <p>Add some essentials to get started</p>
              <button className="start-shopping-btn" onClick={onClose}>Shop Now</button>
            </div>
          ) : (
            <div className="cart-content">
              {/* Delivery ETA Banner */}
              <div className="delivery-banner">
                <div className="eta-badge">10 MINS</div>
                <p>Delivery to your doorstep</p>
              </div>

              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <div key={item._id} className="cart-item-card">
                    <img src={item.image || "https://placehold.co/60"} alt={item.name} className="item-img" />
                    <div className="item-info">
                      <h4 className="item-name">{item.name}</h4>
                      <p className="item-qty-text">{item.weight}</p>
                      <div className="item-bottom">
                        <span className="item-price">₹{item.price}</span>
                        <div className="stepper">
                          <button onClick={() => removeFromCart(item._id)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => addToCart(item)}>+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bill Card */}
              <div className="bill-card">
                <h5>Payment Summary</h5>
                <div className="bill-row">
                  <span>Item Total</span>
                  <span className="price-val">₹{cartTotal}</span>
                </div>
                <div className="bill-row">
                  <span>Delivery Fee</span>
                  <span className="free-tag">FREE</span>
                </div>
                <div className="bill-row grand-total">
                  <span>Grand Total</span>
                  <span className="total-val">₹{cartTotal}</span>
                </div>
              </div>

              {/* Trust Footer */}
              <div className="safety-footer">
                <IoShieldCheckmarkOutline size={18} />
                <span>Secure payment and safety verified</span>
              </div>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="checkout-footer">
            <button className="pay-button" onClick={() => onCheckout({ items: cartItems, totalAmount: cartTotal })}>
              <div className="pay-left">
                <span className="price">₹{cartTotal}</span>
                <span className="items-count">{cartItems.length} ITEMS</span>
              </div>
              <div className="pay-right">
                <span>Proceed to Pay</span>
                <span className="chevron">›</span>
              </div>
            </button>
          </div>
        )}
      </div>
    </> 
  );
};

export default CartSidebar;