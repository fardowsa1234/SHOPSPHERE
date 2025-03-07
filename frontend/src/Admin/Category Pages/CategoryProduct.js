import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { RiDeleteBin3Line, RiEditLine } from "react-icons/ri";
import "./CategoryProduct.css";
import { Link } from "react-router-dom";

function CategoryProduct(props) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const category = props.match.params.categoryId;

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setProducts([]);
    axios({
      method: "get",
      url: `https://ecommerceappcj.herokuapp.com/api/products/${category}`,
    }).then((response) => {
      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
    });
  };

  const deleteProduct = (productId) => {
    axios({
      method: "delete",
      url: `https://ecommerceappcj.herokuapp.com/api/products/delete/${productId}`,
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
      setFilteredProducts([]);
      const query = value.toLowerCase();
      const length = query.length;

      products.forEach((product) => {
        const name = product.name.toLowerCase();
        const substring = name.substring(0, length);

        if (name.includes(query)) {
          setFilteredProducts((prev) => {
            return [...prev, product];
          });
        }
      });
    }
  };

  return (
    <div className="dashboard-parent-div">
      <Row>
        <Col className="category-products-content" lg={12}>
          <Row>
            <Col lg={8}>
              <h4>Products</h4>
              <p>Below are the products currently added to your website.</p>
            </Col>
            <Col className="category-product-search-col">
              <div className="category-product-search-div">
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
          <Row className="category-products-row">
            {filteredProducts.map((product) => {
              const commaCost = product.price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              return (
                <Col lg={3} key={product.id}>
                  <Card className="category-product-card">
                    <img
                      src={`https://com/${product.image}`}
                      alt={product.name}
                    />
                    <h5>{product.name}</h5>
                    <p>Cost : Ksh. {commaCost}/-</p>
                    <Link to={`/products/edit/${product.id}`}>
                      <RiEditLine className="category-product-card-icon category-edit-icon" />
                    </Link>
                    <RiDeleteBin3Line
                      onClick={(event) => {
                        event.preventDefault();
                        deleteProduct(product.id);
                      }}
                      className="category-product-card-icon category-delete-icon"
                    />
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

export default CategoryProduct;