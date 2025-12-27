import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import ProductCard from "./ProductCard";
import { FiClock, FiShield, FiRotateCcw, FiPlus, FiMinus, FiChevronRight } from "react-icons/fi";
import { slugify } from "../../utils/urlHelper";
import "../css/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const [product, setProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const result = await res.json();
        if (result.success) {
          setProduct(result.data);
          const catId = typeof result.data.category === "object" ? result.data.category._id : result.data.category;
          const suggRes = await fetch(`http://localhost:5000/api/products?categoryId=${catId}`);
          const suggResult = await suggRes.json();
          setSuggestions(suggResult.data.filter(p => p._id !== id).slice(0, 6));
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); window.scrollTo(0, 0); }
    };
    fetchData();
  }, [id]);

  if (loading || !product) return <div className="pd-loader">Loading...</div>;

  const quantity = getItemQuantity(product._id);
  const discount = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

  return (
    <div className="pd-page">
      <div className="pd-layout">
        
        {/* LEFT COLUMN: FIXED IMAGE GALLERY */}
        <div className="pd-left-gallery">
          <div className="pd-sticky-image">
            <div className="pd-image-card">
              <img src={product.image} alt={product.name} />
              {discount > 0 && <span className="pd-discount-badge">{discount}% OFF</span>}
            </div>
            <div className="pd-trust-grid">
              <div className="trust-tile"><FiShield /> <span>100% Quality</span></div>
              <div className="trust-tile"><FiRotateCcw /> <span>Easy Returns</span></div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SCROLLABLE INFO */}
        <div className="pd-right-info">
          <nav className="pd-breadcrumb-trail">
            <Link to="/">Home</Link> <FiChevronRight /> 
            <span>{product.category?.name}</span>
          </nav>

          <h1 className="pd-product-name">{product.name}</h1>
          <div className="pd-delivery-eta">
            <FiClock /> <span>Delivery in 10-12 mins</span>
          </div>

          <hr className="pd-divider" />

          <div className="pd-pricing-box">
            <div className="pd-main-price">₹{product.price}</div>
            {product.mrp > product.price && (
              <div className="pd-mrp-price">MRP ₹{product.mrp}</div>
            )}
            <span className="pd-unit-label">{product.weight}</span>
          </div>

          <div className="pd-cta-container">
            {quantity === 0 ? (
              <button className="pd-add-bag-btn" onClick={() => addToCart(product)}>
                ADD TO CART
              </button>
            ) : (
              <div className="pd-quantity-stepper">
                <button onClick={() => removeFromCart(product._id)}><FiMinus /></button>
                <span>{quantity}</span>
                <button onClick={() => addToCart(product)}><FiPlus /></button>
              </div>
            )}
          </div>

          <div className="pd-details-card">
            <h3>Product Details</h3>
            <div className="pd-detail-row">
              <label>Description</label>
              <p>{product.description || "No description available for this product."}</p>
            </div>
            <div className="pd-detail-row">
              <label>Unit</label>
              <p>{product.weight}</p>
            </div>
          </div>

          <div className="pd-suggestions-section">
            <h2 className="pd-section-title">Similar Products</h2>
            <div className="pd-suggestions-grid">
              {suggestions.map(p => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;