import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Land from "./Land";
import Login from "./Login";
import Register from "./Register"; // Corrected import statement
import Reset from "./Reset";
import Home from "./Home";
import FriendProfile from "./FriendProfile";
import Support from "./Support";
import { AuthContext } from "../AppContext/AppContext";
import SpookyThreeBackground from "../Background/SpookyThreeBackground";

const Pages = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<Land />} />

      {/* Home page */}
      <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />

      {/* Login, Register, and Reset pages with SpookyThreeBackground */}
      <Route path="/login" element={<><SpookyThreeBackground /><Login /></>} />
      <Route path="/register" element={<><SpookyThreeBackground /><Register /></>} />
      <Route path="/reset" element={<><SpookyThreeBackground /><Reset /></>} />

      {/* Profile page */}
      <Route path="/profile/:id" element={<FriendProfile />} />

      {/* Customer support page */}
      <Route path="/customer-support" element={<Support />} />
    </Routes>
  );
};

export default Pages;
