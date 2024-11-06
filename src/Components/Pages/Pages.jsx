import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Regsiter";
import Reset from "./Reset";
import Home from "./Home";
import FriendProfile from "./FriendProfile";
import Support from "./Support";
import { AuthContext } from "../AppContext/AppContext"; // Auth context import

const Pages = () => {
  const { user } = useContext(AuthContext); // Get auth status from context

  return (
    <div>
      <Routes>
        {/* Redirect the root path based on authentication */}
        <Route path="/" element={user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />
        
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/profile/:id" element={<FriendProfile />} />
        <Route path="/customer-support" element={<Support />} />
      </Routes>
    </div>
  );
};

export default Pages;
