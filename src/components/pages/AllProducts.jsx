import React, { useEffect, useState } from "react";
import { Trash2, Edit, PackageOpen, Search, Filter, Plus, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../css/AllProducts.css";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    window.scrollTo(0, 0);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://quickcart-02mk.onrender.com/api/products");
      const result = await response.json();
      if (result.success && result.data) {
        setProducts(result.data);
        setFilteredProducts(result.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Search Logic
  useEffect(() => {
    const results = products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  const handleDelete = async (id) => {
    if (window.confirm("Move this product to trash?")) {
      try {
        const res = await fetch(`https://quickcart-02mk.onrender.com/api/products/${id}`, { method: "DELETE" });
        const data = await res.json();
        if (data.success) {
          setProducts(products.filter((p) => p._id !== id));
        }
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  if (loading) return <div className="admin-loader"><span></span></div>;

  return (
    <div className="admin-page-wrapper">
      {/* 1. Header Section */}
      <header className="admin-header-main">
        <div className="header-text">
          <h1>Inventory Management</h1>
          <p>Manage your product catalog and stock levels</p>
        </div>
        <button className="add-prod-btn" onClick={() => navigate("/dashboard/add-products")}>
          <Plus size={18} /> Add New Product
        </button>
      </header>

      {/* 2. Control Bar */}
      <div className="admin-controls-card">
        <div className="search-pill">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name, brand, or SKU..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <span className="stats-badge">{filteredProducts.length} Products Found</span>
        </div>
      </div>

      {/* 3. Product Display */}
      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <PackageOpen size={64} />
          <h3>No products found</h3>
          <p>Try adjusting your search or add a new product to the catalog.</p>
        </div>
      ) : (
        <div className="modern-product-grid">
          {filteredProducts.map((product) => (
            <div key={product._id} className="modern-admin-card">
              <div className="card-image-section">
                <img src={product.image} alt={product.name} />
                {product.mrp > product.price && (
                  <div className="promo-tag">
                    {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% Off
                  </div>
                )}
              </div>

              <div className="card-body">
                <div className="category-tag">{product.category?.name || "General"}</div>
                <h3 className="product-title">{product.name}</h3>
                <div className="product-meta">{product.weight} • {product.brand}</div>
                
                <div className="price-row">
                  <div className="price-stack">
                    <span className="current-price">₹{product.price}</span>
                    {product.mrp > product.price && <span className="old-price">₹{product.mrp}</span>}
                  </div>
                  <div className="stock-status in-stock">Active</div>
                </div>
              </div>

              <div className="card-footer-actions">
                <button className="action-icon edit" onClick={() => navigate("/dashboard/add-products", { state: { productToEdit: product } })}>
                  <Edit size={18} />
                </button>
                <button className="action-icon delete" onClick={() => handleDelete(product._id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;