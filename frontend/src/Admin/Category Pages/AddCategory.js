import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import axios from "axios";
import "./AddCategory.css";

function AddCategory() {
  const API_URL = "http://localhost:5000/api";  // Adjust this to your Flask server's URL

  const [newCategory, setNewCategory] = useState({
    name: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const addCategory = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', newCategory.name);

      await axios.post(`${API_URL}/categories`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setNewCategory({ name: "" });
      // Optionally, add a success message or redirect the user
    } catch (err) {
      console.error("Error adding category:", err);
      // Handle the error (e.g., show an error message to the user)
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
        <button onClick={addCategory} className="add-category-btn">
          Add Category
        </button>
      </Card>
    </div>
  );
}

export default AddCategory;
