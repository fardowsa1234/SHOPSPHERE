import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import "./AddProduct.css";

function AddProduct() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category_id: "",  
    description: "",
  });

  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState(null);
  const imageButtonRef = useRef();
  const types = ["image/png", "image/webp", "image/jpg"];

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    setCategories([]);
    axios.get("http://localhost:5000/api/categories")
      .then(response => setCategories(response.data))
      .catch(err => setError("Failed to fetch categories. Please try again."));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  function handleImageChange(event) {
    let selectedFile = event.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      if (selectedFile.size > 5000000) { // 5MB limit
        setError("File is too large. Maximum size is 5MB.");
        return;
      }
      setImage(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
      setError("");
    } else {
      setImage(null);
      setError("Please select an image file (png, jpg or webp)");
    }
  }

  const validateForm = () => {
    if (!newProduct.name.trim()) {
      setError("Product name is required");
      return false;
    }
    if (parseFloat(newProduct.price) <= 0) {
      setError("Price must be greater than 0");
      return false;
    }
    if (parseInt(newProduct.stock) < 0) {
      setError("Stock cannot be negative");
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      price: "",
      stock: "",
      category_id: "",
      description: "",
    });
    setImage(null);
    setImagePreview("");
  };

  const addProduct = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("stock", newProduct.stock);
      if (newProduct.category_id) {
        formData.append("category_id", newProduct.category_id);
      }
      formData.append("description", newProduct.description);
      if (image) {
        formData.append("image", image);
      }

      await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      resetForm();
      setSuccess(true);
      setError("");
      setTimeout(() => setSuccess(false), 3000); // Clear success message after 3 seconds
    } catch (err) {
      console.log("Error : " + err.message);
      setError("Failed to add product. Please try again.");
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-parent-div">
      <div className="add-product-content">
        <h1 className="add-product-title">Add Product</h1>
        <p className="add-product-subtitle">
          Please fill the product details in the form below to add a new product.
        </p>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Product added successfully!</p>}
        <form onSubmit={addProduct} className="add-product-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Product Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category_id">Product Category (Optional)</label>
              <select
                id="category_id"
                name="category_id"
                value={newProduct.category_id}
                onChange={handleChange}
              >
                <option value="">Select a product category (optional)</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="stock">Stock Quantity</label>
              <input
                type="number"
                id="stock"
                name="stock"
                min={0}
                value={newProduct.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row description-image-row">
            <div className="form-group description-group">
              <label htmlFor="description">Product Description</label>
              <textarea
                id="description"
                name="description"
                value={newProduct.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="form-group image-group">
              <label>Product Image</label>
              <div
                className="image-upload-area"
                onClick={() => imageButtonRef.current.click()}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" className="img-preview" />
                ) : (
                  <>
                    <FaCloudUploadAlt className="upload-icon" />
                    <p>Click to upload image</p>
                  </>
                )}
                <input
                  ref={imageButtonRef}
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="add-product-btn" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;