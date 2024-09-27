import React from 'react';
import './Navbar.css';
import logo from './Logo2.png'

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="Logo" className="logo" /> {/* Add logo image */}
      <h1>Pharma Covigilance Platform</h1>
    </div>
  );
};

export default Navbar;
