import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const NotificationWrapper = styled.div`
  position: fixed;
  top: 32px;
  right: 32px;
  z-index: 3000;
  min-width: 280px;
  background: ${({ type }) => (type === "error" ? "#ff4d4f" : type === "success" ? "#4caf50" : "#1a73e8")};
  color: #fff;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  animation: ${fadeIn} 0.3s ease;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  margin-left: auto;
  cursor: pointer;
`;

const NotificationSystem = ({ notification, onClose }) => {
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(onClose, 3500);
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  if (!notification) return null;
  return (
    <NotificationWrapper type={notification.type}>
      <span>{notification.message}</span>
      <CloseBtn onClick={onClose}>×</CloseBtn>
    </NotificationWrapper>
  );
};

export default NotificationSystem;
