import React from 'react';
import './Navbar.css';
import logo from './Logo2.png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/'); // Navigates to the home page
  };

  return (
    <div className="navbar">
      <img 
        src={logo} 
        alt="Logo" 
        className="logo" 
        onClick={handleLogoClick} // Add onClick handler to navigate
        style={{ cursor: 'pointer' }} // Change cursor to pointer to indicate it's clickable
      />
      <h1>Pharma Covigilance Platform</h1>
    </div>
  );
};

export default Navbar;
