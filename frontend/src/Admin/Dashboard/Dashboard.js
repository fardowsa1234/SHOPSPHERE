import React, { useEffect, useState } from "react";
import { IoIosLaptop } from "react-icons/io";
import { FaLaptopMedical } from "react-icons/fa";
import "./Dashboard.css"; 
import { Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    getProductsCount();
  }, []);

  const getProductsCount = () => {
    axios.get("http://localhost:5000/api/dashboard/products-count")
      .then(response => setProductsCount(response.data.count))
      .catch(error => console.error("Error fetching products count:", error));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Here's an overview of your online business.</p>
        
        <div className="dashboard-cards">
          <div className="dashboard-card products">
            <IoIosLaptop className="card-icon" />
            <div className="card-content">
              <h2>Products</h2>
              <p className="card-value">{productsCount}</p>
            </div>
          </div>
        </div>

        <h2 className="section-title">Quick Links</h2>
        <div className="quick-links">
          <QuickLinkCard
            icon={<IoIosLaptop />}
            title="All Products"
            description="View, remove or edit products"
            link="/admin/products"
          />
          <QuickLinkCard
            icon={<FaLaptopMedical />}
            title="Add Products"
            description="Add new products"
            link="/admin/products/add"
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