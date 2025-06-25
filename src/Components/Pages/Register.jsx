import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../AppContext/AppContext';
import Button from './Button';
import Toast from './Toast';
import './Pages.css';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'error' });
  const { registerWithEmailAndPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required').min(6, 'Must be at least 6 characters'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm your password'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await registerWithEmailAndPassword(values.name, values.email, values.password);
        setLoading(false);
        showToast('Registration successful! Redirecting...', 'success');
        setTimeout(() => navigate('/login'), 1200);
      } catch (error) {
        setLoading(false);
        showToast('Registration failed. Please try again.');
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  // Show first error as toast on submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
    if (Object.keys(formik.errors).length > 0) {
      const firstError = Object.values(formik.errors)[0];
      showToast(firstError);
    }
  };

  return (
    <div className="register-page">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'error' })} />
      <div className="auth-container glass-card">
        <h2 className="auth-title">Create Account</h2>
        <form onSubmit={handleFormSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Name"
              name="name"
              {...formik.getFieldProps('name')}
              autoComplete="off"
            />
          </div>
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
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              placeholder="Confirm Password"
              name="confirmPassword"
              {...formik.getFieldProps('confirmPassword')}
              autoComplete="new-password"
            />
          </div>
          <Button
            label={loading ? 'Registering...' : 'Register'}
            type="submit"
            className="auth-button"
            disabled={loading}
          />
        </form>
        <Link to="/login" className="auth-link">
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  );
};

export default Register;

