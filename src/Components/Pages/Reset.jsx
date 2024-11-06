import React, { useState } from "react";
import { Input, Typography } from "@material-tailwind/react";
import Button from "./Button"; // Your custom Button component
import { Link } from "react-router-dom";

const Reset = () => {
  const [email, setEmail] = useState("");

  // Handle continue button functionality
  const handleContinue = () => {
    console.log("Reset password link sent to:", email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-96 bg-white/90 backdrop-filter backdrop-blur-sm shadow-xl rounded-lg">
        <div className="mb-4 grid h-28 place-items-center bg-[#008000] rounded-t-lg">
          <Typography variant="h3" color="white">
            RESET PASSWORD
          </Typography>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <Typography variant="h6" color="blue-gray" className="pb-4">
            Enter the email address associated with your account and we’ll send you a link to reset your password
          </Typography>
          <Input
            type="email"
            label="Email"
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            label="Continue"
            variant="gradient"
            fullWidth
            className="mt-4"
            onClick={handleContinue}
          />
        </div>
        <div className="pt-0 text-center">
          <span className="text-gray-700">Remember your password?</span>
          <Link to="/login" className="text-blue-500 hover:text-blue-700 transition-colors">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Reset;
