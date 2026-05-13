import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Admin from "./Pages/Admin";
import User from "./Pages/User";
import MovieDetails from "./Pages/MovieDetails";
import Watchlist from "./Pages/Watchlist";
import Cast from "./Pages/Cast";
import Search from "./Pages/Search";

const App = () => {
  const navigate = useNavigate();

  const [authState, setAuthState] = useState({
    isLoggedIn: sessionStorage.getItem("isLoggedIn") === "true",
    role: sessionStorage.getItem("role"),
  });

  // 🔥 Update auth after successful login
  const updateAuth = () => {
    setAuthState({
      isLoggedIn: sessionStorage.getItem("isLoggedIn") === "true",
      role: sessionStorage.getItem("role"),
    });
  };

  // 🔥 Logout function
  const handleLogout = () => {
    sessionStorage.clear(); // Clears session when logout clicked
    setAuthState({ isLoggedIn: false, role: null });
    navigate("/");
  };

  return (
    <>
      <Header
        isLoggedIn={authState.isLoggedIn}
        role={authState.role}
        onLogout={handleLogout}
      />

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={<Login onLoginSuccess={updateAuth} />}
          />

          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />

          {/* 🔐 Admin Protected Route */}
          <Route
            path="/admin"
            element={
              authState.isLoggedIn && authState.role === "admin" ? (
                <Admin />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* 🔐 User Protected Route */}
          <Route
            path="/user"
            element={
              authState.isLoggedIn && authState.role === "user" ? (
                <User />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/movie/:id"
            element={
              authState.isLoggedIn ? (
                <MovieDetails />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/watchlist"
            element={authState.isLoggedIn ? <Watchlist /> : <Navigate to="/login" />}
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />

          <Route path="/search/:keyword" element={<Search />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
};

export default App;