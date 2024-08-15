import React, { useEffect, useState } from "react";
import {
  RiShoppingCart2Line,
  RiUser3Line,
} from "react-icons/ri";
import { IoIosLaptop } from "react-icons/io";
import { BsCurrencyExchange } from "react-icons/bs";
import { BsViewList } from "react-icons/bs";
import { FaLaptopMedical } from "react-icons/fa";
import "./Dashboard.css"; 
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
    axios.get("https://dummyjson.com/api/products/")
      .then(response => setProducts(response.data.products));
  };

  const getUsers = () => {
    setUsers();
    axios.get("https://dummyjson.com/api/users/")
      .then(response => setUsers(response.data.allUsers));
  };

  const getOrders = () => {
    setOrders();
    axios.get("https://dummyjson.com/api/orders/")
      .then(response => {
        setOrders(response.data.allOrders);
        const rev = response.data.allOrders.reduce((acc, order) => acc + order.orderAmount, 0);
        setTotalRevenue(rev);
      });
  };

  const formatCurrency = (amount) => {
    return amount ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Here's an overview of your online business.</p>
        
        <div className="dashboard-cards">
          <div className="dashboard-card revenue">
            <BsCurrencyExchange className="card-icon" />
            <div className="card-content">
              <h2>Total Revenue</h2>
              <p className="card-value">Ksh {formatCurrency(totalRevenue)}</p>
            </div>
          </div>
          <div className="dashboard-card products">
            <IoIosLaptop className="card-icon" />
            <div className="card-content">
              <h2>Products</h2>
              <p className="card-value">{products ? products.length : 0}</p>
            </div>
          </div>
          <div className="dashboard-card customers">
            <RiUser3Line className="card-icon" />
            <div className="card-content">
              <h2>Customers</h2>
              <p className="card-value">{users ? users.length : 0}</p>
            </div>
          </div>
        </div>

        <h2 className="section-title">Quick Links</h2>
        <div className="quick-links">
          <QuickLinkCard
            icon={<BsViewList />}
            title="Product Categories"
            description="Add, remove or edit categories"
            link="/categories"
          />
          <QuickLinkCard
            icon={<IoIosLaptop />}
            title="All Products"
            description="View, remove or edit products"
            link="/products"
          />
          <QuickLinkCard
            icon={<FaLaptopMedical />}
            title="Add Products"
            description="Add new products"
            link="/products/add"
          />
          <QuickLinkCard
            icon={<RiShoppingCart2Line />}
            title="All Orders"
            description="View, remove or edit orders"
            link="/orders"
          />
          <QuickLinkCard
            icon={<RiUser3Line />}
            title="All Customers"
            description="View registered customer details"
            link="/users"
          />
        </div>
      </div>
    </div>
  );
}

function QuickLinkCard({ icon, title, description, link }) {
  return (
    <Link to={link} className="quick-link-card">
      <div className="quick-link-icon">{icon}</div>
      <div className="quick-link-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default Dashboard;