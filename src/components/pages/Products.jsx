import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import ProductCard from "./ProductCard";
import SeoFooter from "./SeoFooter";
import { FiGrid, FiChevronRight, FiSearch, FiInbox } from "react-icons/fi"; 
import { slugify } from "../../utils/urlHelper";
import "../css/Products.css";

function Products() {
  const { categoryId, searchTerm } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/category");
        const result = await response.json();
        if (result.success) setCategories(result.categories);
      } catch (error) { console.error(error); }
    };
    fetchCategories();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setActiveCategory(null);
      fetchProducts(`http://localhost:5000/api/products?search=${searchTerm}`);
    } else if (categories.length > 0) {
      const match = categories.find((c) => c._id === categoryId);
      if (match) {
        setActiveCategory(match);
        fetchProducts(`http://localhost:5000/api/products?categoryId=${categoryId}`);
      } else if (!categoryId) {
        navigate(`/cn/${slugify(categories[0].name)}/cid/${categories[0]._id}`, { replace: true });
      }
    }
  }, [categoryId, searchTerm, categories]);

  const fetchProducts = async (url) => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const result = await res.json();
      setProducts(result.success ? result.data : []);
    } catch (error) { setProducts([]); }
    finally { setLoading(false); }
  };

  return (
    <div className="product-page-layout">
      {/* Sidebar Panel */}
      <aside className="modern-sidebar">
        <div className="sidebar-sticky-wrap">
          <Sidebar categories={categories} activeCategoryId={activeCategory?._id} />
        </div>
      </aside>

      <main className="product-main-content">
        {/* Modern Sticky Header */}
        <header className="content-header">
          <div className="breadcrumb-nav">
             <Link to="/">Home</Link> <FiChevronRight /> 
             <span>{searchTerm ? "Search" : activeCategory?.name}</span>
          </div>
          
          <div className="header-main-row">
            <div className="title-stack">
               <h1>{searchTerm ? `Results for "${searchTerm}"` : activeCategory?.name}</h1>
               <p className="product-count">{products.length} Items found</p>
            </div>
            <div className="view-options">
               <button className="active"><FiGrid /></button>
            </div>
          </div>
        </header>

        <div className="results-container">
          {loading ? (
            <div className="skeleton-grid">
               {[...Array(8)].map((_, i) => <div key={i} className="skeleton-card" />)}
            </div>
          ) : products.length > 0 ? (
            <div className="modern-products-grid">
              {products.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          ) : (
            <div className="empty-state">
              <FiInbox size={48} />
              <h3>No results found</h3>
              <p>Try adjusting your search or category filters.</p>
              <button onClick={() => navigate('/')}>Back to Home</button>
            </div>
          )}

          <footer className="footer-container">
            <SeoFooter activeCategory={activeCategory} categories={categories} />
          </footer>
        </div>
      </main>
    </div>
  );
}

export default Products;