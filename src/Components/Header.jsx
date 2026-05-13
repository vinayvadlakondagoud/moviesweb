import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({ isLoggedIn, role, onLogout }) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  // 🔥 USER DATA
  const username = sessionStorage.getItem("name") || "User";

  // 🎯 PROFESSIONAL AVATAR (STABLE)
  const avatar = sessionStorage.getItem("defaultAvatar")
    || `https://api.dicebear.com/7.x/initials/svg?seed=${username}`;

  // 🔥 LOGOUT
  const handleLogoutClick = () => {
    sessionStorage.clear(); // clears avatar + user
    onLogout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-wrapper">

        {/* 🔴 LOGO */}
        <div className="header-logo">
          <NavLink to="/">
            Movies<span>Web</span>
          </NavLink>
        </div>

        {/* 🧭 NAV LINKS */}
        <nav className="header-nav">
          <NavLink to="/" end>Home</NavLink>

          {isLoggedIn && (
            <NavLink to={role === "admin" ? "/admin" : "/user"}>
              {role === "admin" ? "Admin" : "Profile"}
            </NavLink>
          )}

          {isLoggedIn && role === "user" && (
            <NavLink to="/watchlist">Watchlist</NavLink>
          )}

          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>

        {/* 🔥 RIGHT SIDE */}
        <div className="header-right">

          {/* 🔍 SEARCH */}
          <input
            type="text"
            placeholder="Search movies..."
            className="search-box"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && search.trim()) {
                navigate(`/search/${search}`);
              }
            }}
          />

          {!isLoggedIn ? (
            <>
              <NavLink to="/login" className="login-link">
                Login
              </NavLink>

              <NavLink to="/register" className="register-btn">
                Register
              </NavLink>
            </>
          ) : (
            <div className="user-box">

              {/* 👤 AVATAR */}
              <img
                src={avatar}
                alt="avatar"
                onError={(e) => {
                  e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${username}`;
                }}
              />

              {/* 👤 NAME */}
              <div className="user-info">
                <span className="welcome-text">Welcome</span>
                <strong>{username}</strong>
              </div>

              {/* 🚪 LOGOUT */}
              <button onClick={handleLogoutClick}>
                Logout
              </button>
            </div>
          )}

        </div>

      </div>
    </header>
  );
};

export default Header;