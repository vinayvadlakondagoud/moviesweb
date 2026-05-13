import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Brand */}
        <div className="footer-brand">
          <h2>
            <span>Movies</span>Web
          </h2>
          <p>Your ultimate destination for movies.</p>
        </div>

        {/* Explore */}
        <div className="footer-links">
          <h4>Explore</h4>
          
          {/* Movies → Login */}
          <p
            className="footer-link"
            onClick={() => navigate("/login")}
          >
            Movies
          </p>

          <p
            className="footer-link"
            onClick={() => navigate("/watchlist")}
          >
            Watchlist
          </p>
        </div>

        {/* Company */}
        <div className="footer-links">
          <h4>Company</h4>

          <p
            className="footer-link"
            onClick={() => navigate("/about")}
          >
            About
          </p>

          <p
            className="footer-link"
            onClick={() => navigate("/contact")}
          >
            Contact
          </p>
        </div>

        {/* Social */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} MoviesWeb. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;