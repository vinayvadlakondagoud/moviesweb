import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
  // ✅ VALIDATE BEFORE SENDING OTP
  if (!formData.name || !formData.email || !formData.password) {
    alert("Fill all fields first");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch("http://localhost:5000/api/users/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("OTP sent to your email 📩");
      setOtpSent(true);
    } else {
      alert(data.message);
    }

  } catch (err) {
    alert("Server error");
  }

  setLoading(false);
};

  const handleRegister = async (e) => {
  e.preventDefault();

  if (!otp) {
    alert("Enter OTP");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch("http://localhost:5000/api/users/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        otp,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registration successful 🎉");
      navigate("/login");
    } else {
      alert(data.message);
    }

  } catch (err) {
    alert("Server error");
  }

  setLoading(false);
};

  return (
    <div className="login-page">
      <div className="login-container register-only">
        <div className="login-form">
          <h2>Create Account </h2>

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* 🔥 SEND OTP BUTTON */}
            {!otpSent && (
              <button
                type="button"
                className="login-btn"
                onClick={handleSendOtp}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            )}

            {/* 🔥 OTP INPUT */}
            {otpSent && (
              <div className="form-group">
                <label>Enter OTP</label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
            )}

            {/* 🔥 REGISTER BUTTON */}
            {otpSent && (
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Registering..." : "Verify & Register"}
              </button>
            )}
          </form>

          <p className="login-hint">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#e50914" }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;