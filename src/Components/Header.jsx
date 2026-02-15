import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-wrapper">
        {/* Logo */}
        <div className="header-logo">
          <NavLink to="/">
            Movies<span>Web</span>
          </NavLink>
        </div>

        {/* Navigation */}
        <nav className="header-nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>

        {/* Auth Buttons */}
        <div className="header-auth">
          <NavLink to="/login" className="login-link">
            Login
          </NavLink>
          <NavLink to="/register" className="register-btn">
            Register
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
