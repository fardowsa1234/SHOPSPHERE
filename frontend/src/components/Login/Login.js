import React, { useState } from "react";
import { Button, FormGroup, Input, InputGroup, InputGroupText } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./style.scss";

const initialUser = { password: "", identifier: "" };

const Login = () => {
  const [user, setUser] = useState(initialUser);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!user.identifier.trim()) formErrors.identifier = "Email is required";
    if (!user.password) formErrors.password = "Password is required";
    if (!/^\d{8}$/.test(user.password)) {
      formErrors.password = "Password must be exactly 8 numbers";
    }
    return formErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const url = "http://localhost:5000/login";
    try {
      const { data } = await axios.post(url, user);
      if (data.jwt) {
        // Removed storeUser and its usage
        toast.success("Logged in successfully!", {
          hideProgressBar: true,
        });
        setUser(initialUser);
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed", {
        hideProgressBar: true,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Welcome Back</h2>
        <p>Please login to your account</p>
        <form onSubmit={handleLogin}>
          <FormGroup>
            <Input
              type="email"
              name="identifier"
              value={user.identifier}
              onChange={handleChange}
              placeholder="Email"
              className={`input-field ${errors.identifier ? 'is-invalid' : ''}`}
              required
            />
            {errors.identifier && <div className="invalid-feedback">{errors.identifier}</div>}
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={handleChange}
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
          <Button type="submit" color="primary" className="login-button">
            Login
          </Button>
        </form>
        
        <p className="signup-text">
          Don't have an account? <Link to="/registration">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
