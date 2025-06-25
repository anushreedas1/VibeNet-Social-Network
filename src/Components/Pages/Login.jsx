import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../AppContext/AppContext";
import { auth, onAuthStateChanged } from "../firebase/firebase";
import Button from "./Button";
import Toast from "./Toast";
import './Auth.css';
import './Pages.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'error' });
  const { loginWithEmailAndPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Must be at least 6 characters long"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await loginWithEmailAndPassword(values.email, values.password);
        showToast('Login successful! Redirecting...', 'success');
        setTimeout(() => navigate("/"), 1200);
      } catch (error) {
        setLoading(false);
        showToast("Login failed. Please check your credentials.");
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
    if (Object.keys(formik.errors).length > 0) {
      const firstError = Object.values(formik.errors)[0];
      showToast(firstError);
    }
  };

  return (
    <div className="login-page flex items-center justify-center min-h-screen">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'error' })} />
      {loading ? (
        <div className="grid grid-cols-1 justify-items-center items-center">
          <ClipLoader color="#ffffff" size={90} speedMultiplier={0.5} />
        </div>
      ) : (
        <div className="auth-container glass-card">
          <h2 className="auth-title">Sign In</h2>
          <form onSubmit={handleFormSubmit} className="auth-form">
            <div className="form-group">
              <input
                type="email"
                className="form-input"
                placeholder="Email"
                name="email"
                {...formik.getFieldProps('email')}
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-input"
                placeholder="Password"
                name="password"
                {...formik.getFieldProps('password')}
                autoComplete="current-password"
              />
            </div>
            <Button
              label={loading ? "Signing in..." : "Sign In"}
              type="submit"
              className="auth-button"
              disabled={loading}
            />
          </form>
          <div className="auth-links">
            <Link to="/reset" className="auth-link">Forgot password?</Link>
            <Link to="/register" className="auth-link">Don't have an account? Register</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
