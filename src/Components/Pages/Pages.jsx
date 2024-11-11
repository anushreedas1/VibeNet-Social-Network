import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Land from "./Land";
import Login from "./Login";
import Register from "./Regsiter";
import Reset from "./Reset";
import Home from "./Home";
import FriendProfile from "./FriendProfile";
import Support from "./Support";
import { AuthContext } from "../AppContext/AppContext";

const Pages = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Land as the default page */}
      <Route path="/" element={<Land />} />

      {/* Only show the home page if the user is authenticated */}
      <Route path="/home" element={user ? <Home /> : <Navigate to="/login" replace />} />

      {/* Other pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/profile/:id" element={<FriendProfile />} />
      <Route path="/customer-support" element={<Support />} />
    </Routes>
  );
};

export default Pages;
