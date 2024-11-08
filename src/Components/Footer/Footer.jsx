import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark-blue text-light-gray py-10 px-5">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
        
        {/* Left section with logo, description, and social icons */}
        <div className="space-y-4">
          <div className="text-blue-400 text-3xl font-semibold">
            <span className="logo-icon">🌊</span> {/* Replace with your logo */}
          </div>
          <p className="text-light-gray">
            Making the world a better place through constructing elegant hierarchies.
          </p>
          <div className="flex space-x-6 text-3xl">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
            <FaGithub />
            <FaYoutube />
          </div>
        </div>

        {/* Solutions section */}
        <div>
          <h3 className="font-semibold text-white mb-4">Solutions</h3>
          <ul className="space-y-2">
            <li>Marketing</li>
            <li>Analytics</li>
            <li>Automation</li>
            <li>Commerce</li>
            <li>Insights</li>
          </ul>
        </div>

        {/* Support section */}
        <div>
          <h3 className="font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2">
            <li>Submit ticket</li>
            <li>Documentation</li>
            <li>Guides</li>
          </ul>
        </div>

        {/* Company section */}
        <div>
          <h3 className="font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-2">
            <li>About</li>
            <li>Blog</li>
            <li>Jobs</li>
            <li>Press</li>
          </ul>
        </div>

        {/* Legal section */}
        <div>
          <h3 className="font-semibold text-white mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>Terms of service</li>
            <li>Privacy policy</li>
            <li>License</li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright section */}
      <div className="text-center text-light-gray mt-10 border-t border-gray-700 pt-5">
        © 2024 Your Company, Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
