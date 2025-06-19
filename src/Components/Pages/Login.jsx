import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../AppContext/AppContext";
import { auth, onAuthStateChanged } from "../firebase/firebase";
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';
import Button from "./Button"; // Adjust the import path if necessary
import './Auth.css';
import './Pages.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, loginWithEmailAndPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(NET({
        el: document.body,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x0,
        backgroundColor: 0x111111,
        points: 20.00,
        maxDistance: 30.00,
        spacing: 20.00,
        showDots: false
      }));
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(6, "Must be at least 6 characters long")
        .matches(/^[a-zA-Z]+$/, "Password can only contain letters"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await loginWithEmailAndPassword(values.email, values.password);
        navigate("/"); // Redirect on successful login
      } catch (error) {
        setLoading(false);
        alert("Login failed. Please check your credentials.");
      }
    },
  });

  return (
    <div className="login-page flex items-center justify-center min-h-screen">
      {loading ? (
        <div className="grid grid-cols-1 justify-items-center items-center">
          <ClipLoader color="#ffffff" size={150} speedMultiplier={0.5} />
        </div>
      ) : (
        <div className="auth-container">
          <h1 className="auth-title">Sign In</h1>
          <form className="auth-form" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-input"
                placeholder="Email"
                required
                name="email"
                {...formik.getFieldProps("email")}
                onFocus={() => formik.setFieldTouched("email", true)}
                onBlur={() => formik.setFieldTouched("email", formik.values.email !== '')}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="error-message">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-input"
                placeholder="Password"
                required
                name="password"
                {...formik.getFieldProps("password")}
                onFocus={() => formik.setFieldTouched("password", true)}
                onBlur={() => formik.setFieldTouched("password", formik.values.password !== '')}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="error-message">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <div className="my-5"></div> 


            <Button
              label="Login"
              type="submit"
              className="w-full h-12 flex items-center justify-center"
            />
          </form>
          <div className="auth-links">
            <Link to="/reset" className="auth-link">Forgot Password?</Link>
            <Link to="/register" className="auth-link">Don't have an account? Sign Up</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
