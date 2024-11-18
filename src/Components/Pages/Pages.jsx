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
import Background from "../Background/Background";

const Pages = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<Land />} />

      {/* Home page */}
      <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />

      {/* Login, Register, and Reset pages with Background wrapper */}
      <Route
        path="/login"
        element={
          <Background>
            <Login />
          </Background>
        }
      />
      <Route
        path="/register"
        element={
          <Background>
            <Register />
          </Background>
        }
      />
      <Route
        path="/reset"
        element={
          <Background>
            <Reset />
          </Background>
        }
      />

      {/* Profile page */}
      <Route path="/profile/:id" element={<FriendProfile />} />

      {/* Customer support page */}
      <Route path="/customer-support" element={<Support />} />
    </Routes>
  );
};

export default Pages;
