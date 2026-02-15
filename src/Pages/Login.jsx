import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🔒 Fixed users & roles
  const users = [
    {
      email: "admin@moviehub.com",
      password: "admin123",
      role: "admin",
    },
    {
      email: "user@moviehub.com",
      password: "user123",
      role: "user",
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Same validation logic
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email");
      return;
    }

    const matchedUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!matchedUser) {
      setError("Invalid email or password");
      return;
    }

    // Save role (for later use)
    localStorage.setItem("role", matchedUser.role);
    localStorage.setItem("isLoggedIn", true);

    // Redirect based on role
    if (matchedUser.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Branding */}
        <div className="login-brand">
          <h1>
            Movie<span>Hub</span>
          </h1>
          <p>
            Login to access exclusive movies, ratings and personalized
            recommendations.
          </p>
        </div>

        {/* Login Form */}
        <div className="login-form">
          <h2>Sign In</h2>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <p className="login-hint">
            Admin → admin@moviehub.com / admin123 <br />
            User → user@moviehub.com / user123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
