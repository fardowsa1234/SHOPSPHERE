import React from 'react';
import "./Footer.scss";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer bg-orange'>
      <div className = "container py-4 text-center">
        <div className='flex align-center justify-center text-white fw-3 fs-14'>
          <Link to = "/about" className='text-uppercase'>About ShopSphere.</Link>
        </div>
        <span className='text-white copyright-text text-manrope fs-14 fw-3'>&copy; 2024 ShopSphere. All Rights Reserved.</span>
      </div>
    </footer>
  )
}

export default Footer