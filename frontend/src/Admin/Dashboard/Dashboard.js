import React, { useEffect, useState } from "react";
import {
  RiShoppingCart2Line,
  RiUser3Line,
} from "react-icons/ri";
import { IoIosLaptop } from "react-icons/io";
import { BsCurrencyExchange } from "react-icons/bs";
import { BsViewList } from "react-icons/bs";
import { FaLaptopMedical } from "react-icons/fa";
import "./Dashboard.css"; // Import the CSS file for custom styling
import { Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [orders, setOrders] = useState();
  const [totalRevenue, setTotalRevenue] = useState();
  const [products, setProducts] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    getOrders();
    getUsers();
    getProducts();
  }, []);

  const getProducts = () => {
    setProducts();
    axios.get("/api/products/")
      .then(response => setProducts(response.data.products));
  };

  const getUsers = () => {
    setUsers();
    axios.get("/api/users/")
      .then(response => setUsers(response.data.allUsers));
  };

  const getOrders = () => {
    setOrders();
    axios.get("/api/orders/")
      .then(response => {
        setOrders(response.data.allOrders);
        const rev = response.data.allOrders.reduce((acc, order) => acc + order.orderAmount, 0);
        setTotalRevenue(rev);
      });
  };

  return (
    <div className="dashboard-parent-div">
      <div className="dashboard-home-content">
        <h4>Dashboard</h4>
        <p>Here's an overview of your online business.</p>
        <div className="dashboard-cards-container">
        <div className="dashboard-card">
  <BsCurrencyExchange className="card-icon" />
  <h4>
    Ksh {totalRevenue ? totalRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0} Total Revenue
  </h4>
  <p>
    Ksh {totalRevenue ? totalRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0} revenue generated
  </p>
</div>
          <div className="dashboard-card">
            <IoIosLaptop className="card-icon" />
            <h4>{products ? products.length : 0} Products</h4>
            <p>{products ? products.length : 0} products added</p>
          </div>
          <div className="dashboard-card">
            <RiUser3Line className="card-icon" />
            <h4>{users ? users.length : 0} Customers</h4>
            <p>{users ? users.length : 0} registered customers</p>
          </div>
        </div>
        <h4>Quick Links</h4>
        <div className="dashboard-action-links">
          <div className="dashboard-action-card">
            <BsViewList className="action-icon" />
            <h4>Product Categories</h4>
            <p>
              <Link to="/categories">Click here</Link> to add, remove or edit categories
            </p>
          </div>
          <div className="dashboard-action-card">
            <IoIosLaptop className="action-icon" />
            <h4>All products</h4>
            <p>
              <Link to="/products">Click here</Link> to view, remove or edit products
            </p>
          </div>
          <div className="dashboard-action-card">
            <FaLaptopMedical className="action-icon" />
            <h4>Add Products</h4>
            <p>
              <Link to="/products/add">Click here</Link> to add new products
            </p>
          </div>
          <div className="dashboard-action-card">
            <RiShoppingCart2Line className="action-icon" />
            <h4>All Orders</h4>
            <p>
              <Link to="/orders">Click here</Link> to view, remove or edit orders
            </p>
          </div>
          <div className="dashboard-action-card">
            <RiUser3Line className="action-icon" />
            <h4>All Customers</h4>
            <p>
              <Link to="/users">Click here</Link> to view registered customer details
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
