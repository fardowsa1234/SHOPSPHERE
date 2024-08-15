import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const AuthButton = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  if (user && user.jwt) {
    return (
      <Button color="primary" onClick={handleLogout}>
        Logout
      </Button>
    );
  } else {
    return (
      <Link to="/login">
        <Button color="primary">Login</Button>
      </Link>
    );
  }
};

export default AuthButton;