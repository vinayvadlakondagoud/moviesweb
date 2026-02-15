import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <h2>
            <span>Movie</span>Hub
          </h2>
          <p>Your ultimate destination for movies & TV shows.</p>
        </div>

        {/* Links */}
        <div className="footer-links">
          <h4>Explore</h4>
          <a href="#movies">Movies</a>
          <a href="#tvshows">TV Shows</a>
          <a href="#trending">Trending</a>
          <a href="#toprated">Top Rated</a>
        </div>

        <div className="footer-links">
          <h4>Company</h4>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms & Conditions</a>
        </div>

        {/* Social */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <span>🌐</span>
            <span>📘</span>
            <span>📸</span>
            <span>🐦</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} MovieHub. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
