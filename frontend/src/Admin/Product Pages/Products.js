import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { RiDeleteBin3Line, RiEditLine } from "react-icons/ri";
import { Link } from "react-router-dom";

import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setProducts([]);
    axios({
      method: "get",
      url: "http://localhost:1337/api/Product?populate=*",
    }).then((response) => {
      const formattedProducts = response.data.data.map((item) => ({
        id: item.id,
        ...item.attributes,
      }));
      setProducts(formattedProducts);
      setFilteredProducts(formattedProducts);
    });
  };

  const deleteProduct = (productId) => {
    axios({
      method: "delete",
      url: `http://localhost:1337/api/Product/${productId}`, // Correctly formatted URL with backticks
    }).then((response) => {
      console.log(response.data);
      getProducts();
    });
  };

  const searchQueryChangeHandler = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setSearchQuery(value);

    if (value === "") {
      setFilteredProducts(products);
    } else {
      const query = value.toLowerCase();
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="dashboard-parent-div">
      <div className="products-content">
        <Row>
          <Col lg={8}>
            <h4>Products</h4>
            <p>Below are the products currently added to your Shop.</p>
          </Col>
          <Col className="product-search-col">
            <div className="product-search-div">
              <p>Search Product</p>
              <input
                type="text"
                name="search"
                value={searchQuery}
                onChange={searchQueryChangeHandler}
              />
            </div>
          </Col>
        </Row>
        <hr />
        <Row className="products-row">
          {filteredProducts.map((product) => {
            const commaCost = product.price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return (
              <Col lg={3} key={product.id}>
                <Card className="product-card">
                  <img
                    src={`http://localhost:1337${product.image.data.attributes.url}`} // Correctly formatted src attribute
                    alt={product.name}
                  />
                  <h5>{product.name}</h5>
                  <p>Cost : Ksh. {commaCost}/-</p>
                  <Link to={`/products/edit/${product.id}`}>
                    <RiEditLine className="product-card-icon edit-icon" />
                  </Link>
                  <RiDeleteBin3Line
                    onClick={(event) => {
                      event.preventDefault();
                      deleteProduct(product.id);
                    }}
                    className="product-card-icon delete-icon"
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default Products;
