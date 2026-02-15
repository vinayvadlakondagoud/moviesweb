import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Admin from "./Pages/Admin";
import User from "./Pages/User";

const App = () => {
  const role = localStorage.getItem("role");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <>
      <Header />

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />

          {/* Role-based dashboards */}
          <Route
            path="/admin"
            element={
              isLoggedIn && role === "admin" ? (
                <Admin />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/user"
            element={
              isLoggedIn && role === "user" ? (
                <User />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
};

export default App;