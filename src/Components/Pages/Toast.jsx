import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'error', onClose, duration = 2500 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className={`toast toast-${type}`}> 
      <span className="toast-icon">{type === 'error' ? '⚠️' : '✅'}</span>
      <span className="toast-message">{message}</span>
    </div>
  );
};

export default Toast;
