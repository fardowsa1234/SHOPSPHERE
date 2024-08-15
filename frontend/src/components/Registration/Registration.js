import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, FormGroup, Input, Form, InputGroup, InputGroupText } from "reactstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./style.scss";

const initialUser = { email: "", password: "", username: "" };

const Registration = () => {
  const [user, setUser] = useState(initialUser);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    if (!user.username.trim()) formErrors.username = "Full name is required";
    if (!user.email.trim()) formErrors.email = "Email is required";
    if (!user.password) formErrors.password = "Password is required";
    if (!/^\d{8}$/.test(user.password)) {
      formErrors.password = "Password must be exactly 8 numbers";
    }
    return formErrors;
  };

  const signUp = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const url = "http://localhost:5000/register";
      const res = await axios.post(url, user);
      if (res.data) {
        toast.success("Registered successfully!", {
          hideProgressBar: true,
        });
        setUser(initialUser);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed", {
        hideProgressBar: true,
      });
    }
  };

  const handleUserChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h2>Create an Account</h2>
        <Form onSubmit={signUp}>
          <FormGroup>
            <Input
              type="text"
              name="username"
              value={user.username}
              onChange={handleUserChange}
              placeholder="Full Name"
              className={`input-field ${errors.username ? 'is-invalid' : ''}`}
              required
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              name="email"
              value={user.email}
              onChange={handleUserChange}
              placeholder="Email"
              className={`input-field ${errors.email ? 'is-invalid' : ''}`}
              required
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={handleUserChange}
                placeholder="Password"
                className={`input-field ${errors.password ? 'is-invalid' : ''}`}
                required
                pattern="\d{8}"
                title="Password must be exactly 8 numbers"
              />
              <InputGroupText className="password-toggle" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </InputGroupText>
            </InputGroup>
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </FormGroup>
          <Button type="submit" color="primary" className="signup-button">
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Registration;