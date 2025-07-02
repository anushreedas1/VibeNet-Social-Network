import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Land from "./Land";
import Login from "./Login";
import Register from "./Register"; // Corrected import statement
import Reset from "./Reset";
import Home from "./Home";
import FriendProfile from "./FriendProfile";
import Support from "./Support";
import MyProfile from "./MyProfile";
import { AuthContext } from "../AppContext/AppContext";
import Settings from "./Settings";

const Pages = ({ darkMode, setDarkMode }) => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<Land />} />

      {/* Home page */}
      <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />

      {/* Login, Register, and Reset pages with SpookyThreeBackground */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<Reset />} />

      {/* Profile page */}
      <Route path="/profile/:id" element={<FriendProfile />} />
      <Route path="/profile" element={user ? <MyProfile /> : <Navigate to="/login" />} />

      {/* Customer support page */}
      <Route path="/customer-support" element={<Support />} />

      {/* Settings page */}
      <Route path="/settings" element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} />} />
    </Routes>
  );
};

export default Pages;
