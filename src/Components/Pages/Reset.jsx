import React, { useState } from "react";
import { Input, Typography } from "@material-tailwind/react";
import Button from "./Button"; // Assuming Button is a custom component in your project
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Reset = () => {
  const [email, setEmail] = useState("");

  // Define loading state only if you plan to use it, otherwise remove this and the loader-related JSX
  const [loading, setLoading] = useState(false); 

  // Handle button click function (if needed)
  const handleContinue = () => {
    // Logic for handling password reset can be placed here
    console.log("Reset password link sent to:", email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center">
          {/* Import ClipLoader if you want to use it */}
          {/* <ClipLoader color="#ffffff" size={150} speedMultiplier={0.5} /> */}
        </div>
      ) : (
        <div className="w-96 bg-white/90 backdrop-filter backdrop-blur-sm shadow-xl">
          <div className="mb-4 grid h-28 place-items-center bg-[#008000]">
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
            {/* Use Link to navigate to the login page */}
            <Link to="/login" className="text-blue-500 hover:text-blue-700 transition-colors">
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reset;
