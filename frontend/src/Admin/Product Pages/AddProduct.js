import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import "./AddProduct.css";

function AddProduct() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    desc: "",
  });

  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState(null);
  const imageButtonRef = useRef();
  const types = ["image/png", "image/jpeg", "image/jpg"];

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    setCategories([]);
    axios.get("http://localhost:5000/admin/product")
      .then(response => setCategories(response.data.categories));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  function handleImageChange(event) {
    let selectedFile = event.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setImage(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    } else {
      setImage(null);
    }
  }

  const addProduct = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("categoryName", newProduct.category);
      formData.append("image", image);
      formData.append("price", newProduct.price);
      formData.append("stockQuantity", newProduct.stock);
      formData.append("description", newProduct.desc);
      
      await axios.post("http://localhost:5000/admin/product", formData);
      
      setImagePreview("");
      setNewProduct({
        name: "",
        price: "",
        stock: "",
        category: "",
        desc: "",
      });
    } catch (err) {
      console.log("Error : " + err.message);
    }
  };

  return (
    <div className="dashboard-parent-div">
      <div className="add-product-content">
        <h1 className="add-product-title">Add Product</h1>
        <p className="add-product-subtitle">
          Please fill the product details in the form below to add a new product.
        </p>
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
              <label htmlFor="category">Product Category</label>
              <select
                id="category"
                name="category"
                value={newProduct.category}
                onChange={handleChange}
                //required
              >
                <option value="">Please select a product category</option>
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
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
              <label htmlFor="desc">Product Description</label>
              <textarea
                id="desc"
                name="desc"
                value={newProduct.desc}
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
          <button type="submit" className="add-product-btn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;