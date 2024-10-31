import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Regsiter";
import Reset from "./Reset";
import Home from "./Home";
import FriendProfile from "./FriendProfile";
import Navbar from "../Navbar/Navbar";

const Pages = () => {
  const location = useLocation();

  // Array of paths where Navbar should not be shown
  const noNavbarRoutes = ['/login', '/register', '/reset'];

  return (
    <>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/profile/:id" element={<FriendProfile />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default Pages;