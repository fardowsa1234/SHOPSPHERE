import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import SidebarAdmin from "../../components/SidebarAdmin/SidebarAdmin";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Updated import

import "./EditProduct.css";

function EditProduct(props) {
  const [productData, setProductData] = useState();
  const [categories, setCategories] = useState([]);

  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState(null);
  const imageButtonRef = useRef();
  const types = ["image/png", "image/jpeg", "image/jpg"];
  const productId = props.match.params.productId;
  const navigate = useNavigate(); // Updated

  useEffect(() => {
    getCategories();
    getProduct();
  }, []);

  const getProduct = () => {
    setProductData();
    axios({
      method: "get",
      url: `https://dummyjson.com/api/products/product/${productId}`,
    })
      .then((response) => {
        setProductData(response.data.product);
        setImagePreview(
          `https://dummyjson.com/${response.data.product.image}`
        );
      })
      .catch((err) => {
        console.log("Error : " + err.message);
      });
  };

  const getCategories = () => {
    setCategories([]);
    axios({
      method: "get",
      url: "https://dummyjson.com/api/categories/",
    }).then((response) => {
      setCategories(response.data.categories);
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleImageChange = (event) => {
    let selectedFile = event.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setImage(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    } else {
      setImage(null);
    }
  };

  const editProduct = async (event) => {
    event.preventDefault();
    try {
      axios({
        method: "patch",
        url: `https://dummyjson.com/api/products/update/${productId}`,
        data: {
          name: productData.name,
          price: productData.price,
          stockQuantity: productData.stockQuantity,
          categoryName: productData.category,
          description: productData.description,
        },
      }).then((response) => {
        if (image) {
          const formData = new FormData();
          formData.append("image", image);
          axios({
            method: "patch",
            url: `https://dummyjson.com/api/products/update/image/${productId}`,
            data: formData,
          }).then(() => {
            setImagePreview("");
            setProductData({
              name: "",
              price: "",
              stockQuantity: "",
              category: "",
              description: "",
            });
            navigate("/products"); // Updated
          });
        } else {
          setImagePreview("");
          setProductData({
            name: "",
            price: "",
            stockQuantity: "",
            category: "",
            description: "",
          });
          navigate("/products"); // Updated
        }
      });
    } catch (err) {
      console.log("Error : " + err.message);
    }
  };

  return (
    <div className="dashboard-parent-div">
      <Row>
        <Col lg={2}>
          <SidebarAdmin />
        </Col>
        <Col className="add-product-content" lg={10}>
          <h4>Update Product</h4>
          {productData && (
            <p>
              Please fill the product details in the form below to update{" "}
              <strong>{productData.name}</strong>.
            </p>
          )}
          <Card className="add-product-form-card">
            {productData && (
              <div>
                <Row>
                  <Col>
                    <div className="add-product-input-div">
                      <p>Product Name</p>
                      <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                  <Col>
                    <div className="add-product-input-div">
                      <p>Product Price</p>
                      <input
                        type="text"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="add-product-input-div">
                      <p>Product Category</p>
                      <select
                        className="add-product-dropdown"
                        name="category"
                        id="category"
                        value={productData.category}
                        onChange={handleChange}
                      >
                        <option className="add-product-dropdown-option">
                          Please select a product category
                        </option>
                        {categories.map((category) => {
                          return (
                            <option
                              key={category._id} // Added key prop
                              className="add-product-dropdown-option"
                              value={category.name}
                            >
                              {category.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </Col>
                  <Col>
                    <div className="add-product-input-div">
                      <p>Stock Quantity</p>
                      <input
                        type="number"
                        name="stockQuantity"
                        min={0}
                        value={productData.stockQuantity}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="add-product-input-div">
                      <p>Product Description</p>
                      <textarea
                        rows={8}
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                  <Col>
                    <div className="add-product-image-div">
                      <div
                        onClick={() => {
                          imageButtonRef.current.click();
                        }}
                        className="product-image-div"
                      >
                        <Form.Control
                          ref={imageButtonRef}
                          style={{ display: "none" }}
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        {imagePreview ? (
                          <img src={imagePreview} alt="preview" />
                        ) : (
                          <p>Add product image</p>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
                <button onClick={editProduct} className="add-product-btn">
                  Update Product
                </button>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default EditProduct;
