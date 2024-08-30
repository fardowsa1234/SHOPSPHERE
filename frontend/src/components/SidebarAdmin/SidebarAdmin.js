import React from "react";
import {
  RiDashboardLine,
  RiShoppingCart2Line,
  RiUser3Line,
  RiAddFill,
  RiFileList3Line,
} from "react-icons/ri";
import { IoIosLaptop } from "react-icons/io";
import "./SidebarAdmin.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";

function SidebarAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="sidebar-parent-div">
      <div className="sidebar-content-div">
        <div className="sidebar-logo-div">
          {/* Logo image has been removed */}
          <h4>SHOPSPHERE ADMIN</h4>
        </div>
        <div className="sidebar-links-div">
          <Link to="/admin/dashboard" className="sidebar-link">
            <div className={`sidebar-item ${isActive("/admin/dashboard") && "active"}`}>
              <RiDashboardLine className="sidebar-icon" />
              <p>Dashboard</p>
            </div>
          </Link>
          <Link to="/admin/categories" className="sidebar-link">
            <div className={`sidebar-item ${isActive("/admin/categories") && "active"}`}>
              <RiFileList3Line className="sidebar-icon" />
              <p>Product Categories</p>
            </div>
          </Link>
          <Link to="/admin/categories/add" className="sidebar-link">
            <div className={`sidebar-item ${isActive("/admin/categories/add") && "active"}`}>
              <RiAddFill className="sidebar-icon" />
              <p>Add Category</p>
            </div>
          </Link>
          <Link to="/admin/products" className="sidebar-link">
            <div className={`sidebar-item ${isActive("/admin/products") && "active"}`}>
              <IoIosLaptop className="sidebar-icon" />
              <p>Products</p>
            </div>
          </Link>
          <Link to="/admin/products/add" className="sidebar-link">
            <div className={`sidebar-item ${isActive("/admin/products/add") && "active"}`}>
              <RiAddFill className="sidebar-icon" />
              <p>Add Product</p>
            </div>
          </Link>
          {/* <Link to="/admin/orders" className="sidebar-link">
            <div className={`sidebar-item ${isActive("/admin/orders") && "active"}`}>
              <RiShoppingCart2Line className="sidebar-icon" />
              <p>Orders</p>
            </div>
          </Link>
          <Link to="/admin/users" className="sidebar-link">
            <div className={`sidebar-item ${isActive("/admin/users") && "active"}`}>
              <RiUser3Line className="sidebar-icon" />
              <p>Users</p>
            </div>
          </Link> */}
          {/* <Link to="/admin/complaints" className="sidebar-link">
            <div className={`sidebar-item ${isActive("/admin/complaints") && "active"}`}>
              <RiFeedbackLine className="sidebar-icon" />
              <p>Complaints & Feedbacks</p>
            </div>
          </Link> */}
        </div>
        <div className="sidebar-footer-div">

        </div>
      </div>
    </div>
  );
}

export default SidebarAdmin;
