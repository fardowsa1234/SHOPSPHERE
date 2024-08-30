import React, { useEffect, useRef, useState, useCallback } from "react";
import { Card, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import "./EditProduct.css";

function EditProduct() {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    stockQuantity: "",
    category: "",
    description: "",
  });
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState(null);
  const imageButtonRef = useRef();
  const types = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  const { productId } = useParams();
  const navigate = useNavigate();

  const getProduct = useCallback(() => {
    axios.get(`http://localhost:5000/api/products/${productId}`)
      .then((response) => {
        setProductData({
          name: response.data.name,
          price: response.data.price.toString(),
          stockQuantity: response.data.stock.toString(),
          category: response.data.category_id ? response.data.category_id.toString() : "",
          description: response.data.description,
        });
        setImagePreview(`http://localhost:5000/uploads/${response.data.image}`);
      })
      .catch((err) => {
        console.log("Error: " + err.message);
      });
  }, [productId]);

  const getCategories = useCallback(() => {
    axios.get("http://localhost:5000/api/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        console.log("Error: " + err.message);
      });
  }, []);

  useEffect(() => {
    getCategories();
    getProduct();
  }, [getCategories, getProduct]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
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
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("stock", productData.stockQuantity);
      formData.append("category_id", productData.category);
      formData.append("description", productData.description);
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.put(
        `http://localhost:5000/api/products/${productId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        console.log("Product updated successfully!");
        navigate("/products");
      } else {
        console.log("Failed to update the product.");
      }
    } catch (err) {
      console.log("Error: " + err.message);
    }
  };

  return (
    <div className="dashboard-parent-div">
      <div className="edit-product-content">
        <h4>Update Product</h4>
        <p>
          Please fill the product details in the form below to update{" "}
          <strong>{productData.name}</strong>.
        </p>
        <Card className="edit-product-form-card">
          <div>
            <div className="edit-product-row">
              <div className="edit-product-col">
                <div className="edit-product-input-div">
                  <p>Product Name</p>
                  <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="edit-product-col">
                <div className="edit-product-input-div">
                  <p>Product Price</p>
                  <input
                    type="text"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="edit-product-col">
                <div className="edit-product-input-div">
                  <p>Stock Quantity</p>
                  <input
                    type="number"
                    name="stockQuantity"
                    min={0}
                    value={productData.stockQuantity}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="edit-product-row">
              <div className="edit-product-col">
                <div className="edit-product-input-div">
                  <p>Product Category</p>
                  <select
                    className="edit-product-dropdown"
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                  >
                    <option value="">Please select a product category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="edit-product-col">
                <div className="edit-product-input-div">
                  <p>Product Description</p>
                  <textarea
                    rows={4}
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="edit-product-col">
                <div className="edit-product-image-div">
                  <div
                    onClick={() => imageButtonRef.current.click()}
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
                      <>
                        <FaCloudUploadAlt className="upload-icon" />
                        <p>Click to upload product image</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <button onClick={editProduct} className="edit-product-btn">
              Update Product
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default EditProduct;
