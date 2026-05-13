import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) setError("");
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        let finalRole = data.role;

        // 🔐 Extra safety check for admin
        if (data.email === "vinayadmin@gmail.com") {
          finalRole = "admin";
        }

        // ✅ Store session data
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("role", finalRole);
        sessionStorage.setItem("name", data.name);
        sessionStorage.setItem("userName", data.name);
        sessionStorage.setItem("userId", data._id);
        localStorage.setItem("token", data.token);

        // Optional callback
        if (onLoginSuccess) onLoginSuccess();

        // 🚀 Redirect based on role
        if (finalRole === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/user", { replace: true });
        }

      } else {
        setError(data.message || "Invalid email or password");
      }

    } catch (err) {
      setError("Server error. Please try again.");
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <h2>Sign In</h2>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          {/* Links */}
          <p className="login-hint">
            <Link
              to="/forgot-password"
              style={{
                fontSize: "14px",
                color: "#aaaaaa",
                textDecoration: "none",
              }}
            >
              Forgot Password?
            </Link>

            <br />
            <br />

            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#e50914",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;