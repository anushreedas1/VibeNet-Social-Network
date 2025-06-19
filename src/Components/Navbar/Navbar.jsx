import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <a href="/" className="logo">
            VibeNet
          </a>
        </div>
        <div className="nav-menu">
          <a href="/home" className="nav-link">
            Home
          </a>
          <a href="/profile" className="nav-link">
            Profile
          </a>
          <button className="nav-button">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;