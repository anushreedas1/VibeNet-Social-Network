import React from "react";
import NavLinks from "./NavLinks";
import UserLinks from "./UserLinks";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 flex justify-between items-center border-b border-gray-100 w-full px-4 md:px-44 py-2 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg">
      <Link to="/">
        <div className="text-3xl font-extrabold text-white font-roboto border border-white p-2 rounded">
          VibeNet
        </div>
      </Link>
      <div className="flex justify-center items-center mx-auto">
        <NavLinks />
      </div>
      <div>
        <UserLinks />
      </div>
    </div>
  );
};

export default Navbar;