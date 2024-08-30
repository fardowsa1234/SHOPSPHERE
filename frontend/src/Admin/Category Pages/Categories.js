import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { RiAddFill, RiEditLine, RiEyeLine } from "react-icons/ri";
import { Link } from "react-router-dom";

import "./Categories.css";

function Categories() {
  const [categories, setCategories] = useState([]);
  const API_URL = "http://localhost:5000/api";  // Adjust this to your Flask server's URL

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    setCategories([]);
    axios.get(`${API_URL}/categories`)
      .then(function (response) {
        setCategories(response.data.map(item => ({
          id: item.id,
          name: item.name,
          image: item.image,
          // Add other fields as needed
        })));
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        // Handle the error (e.g., show an error message to the user)
      });
  };

  return (
    <div className="dashboard-parent-div">
      <Row>
        <Col className="categories-content" lg={12}>
          <Row>
            <Col lg={10}>
              <h4>Product Categories</h4>
              <p>Below are the product categories currently added.</p>
            </Col>
            <Col className="add-cat-col" lg={2}>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>
                    <div className="add-cat-overlay">Add new category.</div>
                  </Tooltip>
                }
              >
                <Link to="/categories/add">
                  <div>
                    <RiAddFill className="add-cat-btn" />
                  </div>
                </Link>
              </OverlayTrigger>
            </Col>
          </Row>
          <hr />
          <Row className="categories-row">
            {categories.map((category) => {
              return (
                <Col lg={3} key={category.id}>
                  <Card className="category-card">
                    {category.image && (
                      <img
                        src={`${API_URL}/images/${category.image}`}
                        alt={category.name}
                      />
                    )}
                    <h5>{category.name}</h5>
                    <Link to={`/categories/edit/${category.id}`}>
                      <RiEditLine className="edit-cat-btn" />
                    </Link>
                    <Link to={`/categories/products/${category.id}`}>
                      <RiEyeLine className="view-prod-btn" />
                    </Link>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Categories;