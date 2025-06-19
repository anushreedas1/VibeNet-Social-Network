import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Pages.css';

const Reset = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic
  };

  return (
    <div className="reset-container">
      <form className="reset-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Reset Password</h2>
        <div className="form-group">
          <input
            type="email"
            className="form-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">
          Reset Password
        </button>
        <Link to="/login" className="form-link">
          Back to Login
        </Link>
      </form>
    </div>
  );
};

export default Reset;
