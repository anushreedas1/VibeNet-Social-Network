import React, { useState } from "react";
import { Input, Button, Typography, Card, CardBody } from "@material-tailwind/react";

const Reset = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <Card className="w-96 bg-gray-800 shadow-lg rounded-lg">
        <CardBody className="flex flex-col items-center p-6">
          <Typography variant="h6" color="white" className="pb-4 text-center">
            Enter the email address associated with your account and we'll send
            you a link to reset your password.
          </Typography>
          <Input
            name="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white text-black placeholder-gray-500"
          />
          <Button variant="gradient" fullWidth className="mt-4">
            Continue
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Reset;
