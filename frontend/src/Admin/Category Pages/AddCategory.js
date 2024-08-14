import React, { useRef, useState } from "react";
import { Card, Form } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import "./AddCategory.css";

function AddCategory() {
  const [newCategory, setNewCategory] = useState({
    name: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState(null);
  const imageButtonRef = useRef();
  const types = ["image/png", "image/jpeg", "image/jpg"];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
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

  const addCategory = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify({ name: newCategory.name }));
      formData.append('files.image', image);

      await axios.post("http://localhost:1337/api/Category", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImagePreview("");
      setNewCategory({ name: "" });
      setImage(null);
    } catch (err) {
      console.log("Error : " + err.message);
    }
  };

  return (
    <div className="add-category-content">
      <h4>Add Category</h4>
      <p>
        Please fill the category details in the form below to add a new
        category.
      </p>
      <Card className="add-product-form-card">
        <div className="add-product-input-div">
          <p>Category Name</p>
          <input
            type="text"
            name="name"
            value={newCategory.name}
            onChange={handleChange}
          />
        </div>
        <div className="add-category-image-div">
          <div
            onClick={() => imageButtonRef.current.click()}
            className="category-image-div"
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
              <div className="upload-icon-container">
                <FontAwesomeIcon icon={faUpload} className="upload-icon" />
                <p>Add category image</p>
              </div>
            )}
          </div>
        </div>
        <button onClick={addCategory} className="add-category-btn">
          Add Category
        </button>
      </Card>
    </div>
  );
}

export default AddCategory;