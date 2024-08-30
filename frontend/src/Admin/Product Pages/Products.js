import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { RiDeleteBin3Line, RiEditLine, RiShoppingCartLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice'; 
import { toast } from 'react-toastify';

import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000/api";  

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setProducts([]);
    axios.get(`${API_URL}/products`)
      .then((response) => {
        const formattedProducts = response.data.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category_name,
          description: item.description,
          stockquantity: item.stock_quantity,
        }));
        setProducts(formattedProducts);
        setFilteredProducts(formattedProducts);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        // Handle the error (e.g., show an error message to the user)
      });
  };

  const deleteProduct = (productId) => {
    axios.delete(`${API_URL}/products/${productId}`)
      .then((response) => {
        console.log(response.data);
        getProducts();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        // Handle the error
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
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      discountedPrice: product.price, 
      image: product.image,
      quantity: 1,
      stock: product.stockquantity,
      description: product.description,
      category: product.category
    }));
    toast.success(`${product.name} added to cart!`);
    // Optionally navigate to cart page
    navigate('/cart');
  };

  const toggleDescription = (productId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
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
            const isExpanded = expandedDescriptions[product.id] || false;

            return (
              <Col lg={3} md={6} sm={12} key={product.id} className="mb-4">
                <Card className="product-card">
                  <div className="product-card-image">
                    <img
                      src={`http://localhost:5000/uploads/${product.image}`}
                      alt={product.name}
                    />
                  </div>
                  <div className="product-card-content">
                    <h5>{product.name}</h5>
                    <p className="product-price">${commaCost}/-</p>
                    <p className="product-category">{product.category}</p>
                    <div className="product-description-container">
                      <p className="product-description">
                        {isExpanded ? product.description : `${product.description.substring(0, 50)}${product.description.length > 50 ? '...' : ''}`}
                      </p>
                      {product.description.length > 50 && (
                        <button className="read-more-btn" onClick={() => toggleDescription(product.id)}>
                          {isExpanded ? 'Show Less' : 'Read More'}
                        </button>
                      )}
                    </div>
                    <div className="product-card-actions">
                      <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                        <RiShoppingCartLine /> Add to Cart
                      </button>
                      <div className="product-card-icons">
                        <Link to={`/admin/products/edit/${product.id}`}>
                          <RiEditLine className="product-card-icon edit-icon" />
                        </Link>
                        <RiDeleteBin3Line
                          onClick={(event) => {
                            event.preventDefault();
                            deleteProduct(product.id);
                          }}
                          className="product-card-icon delete-icon"
                        />
                      </div>
                    </div>
                  </div>
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
