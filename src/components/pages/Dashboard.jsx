import React from "react";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import "../css/Dashboard.css"; // Import the CSS file

const Dashboard = ({ user }) => {
  // 1. Security check
  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role === "admin") {
    return (
      <section className="dashboard-container">
        <h1 className="dashboard-title">Admin Dashboard</h1>

        <div className="admin-layout">
          {/* Left Sidebar */}
          <div className="admin-sidebar">
            <ul className="sidebar-nav">
              <li>
                <NavLink
                  to="/dashboard/all-products"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  All Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/add-products"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  Add Product
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/add-category"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  Add Category
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Main Content Area */}
          <div className="admin-content">
            <Outlet />
          </div>
        </div>
      </section>
    );
  }
};

export default Dashboard;