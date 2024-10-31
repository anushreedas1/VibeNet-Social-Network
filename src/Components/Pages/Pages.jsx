import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Regsiter"; // Correct spelling
import Reset from "./Reset";
import Home from "./Home";
import FriendProfile from "./FriendProfile";
import Support from "../CustomerSupport/Support"; // Adjust the path correctly

const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/profile/:id" element={<FriendProfile />} />
        <Route path="/customer-support" element={<Support />} /> {/* Route to support page */}
      </Routes>
    </div>
  );
};

export default Pages;
