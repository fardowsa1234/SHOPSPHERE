import React, { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import SidebarAdmin from "../../components/SidebarAdmin/SidebarAdmin";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Updated import

//import "./EditCategory.css";

function EditCategory(props) {
  const [categoryData, setCategoryData] = useState({});
  const categoryId = props.match.params.categoryId; // Extract categoryId from props
  const navigate = useNavigate(); // Updated

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    axios({
      method: "get",
      url: `https://dummyjson.com/api/categories/${categoryId}`,
    })
      .then((response) => {
        setCategoryData(response.data.category);
      })
      .catch((err) => {
        console.log("Error : " + err.message);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCategoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const editCategory = (event) => {
    event.preventDefault();
    axios({
      method: "patch",
      url: `https://dummyjson.com/api/categories/${categoryId}`,
      data: categoryData,
    })
      .then(() => {
        navigate("/categories"); // Use navigate instead of history.push
      })
      .catch((err) => {
        console.log("Error : " + err.message);
      });
  };

  return (
    <div className="dashboard-parent-div">
      <Row>
        <Col lg={2}>
          <SidebarAdmin />
        </Col>
        <Col className="edit-category-content" lg={10}>
          <h4>Edit Category</h4>
          {categoryData && (
            <Card className="edit-category-form-card">
              <Form onSubmit={editCategory}>
                <Row>
                  <Col>
                    <div className="edit-category-input-div">
                      <p>Category Name</p>
                      <input
                        type="text"
                        name="name"
                        value={categoryData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                </Row>
                <button type="submit" className="edit-category-btn">
                  Update Category
                </button>
              </Form>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default EditCategory;
