import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../AppContext/AppContext";
import { auth, onAuthStateChanged } from "../firebase/firebase";
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';
import Button from "./Button"; // Adjust the import path as necessary

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, loginWithEmailAndPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(NET({
        el: document.body,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x0,
        backgroundColor: 0x111111,
        points: 20.00,
        maxDistance: 30.00,
        spacing: 20.00,
        showDots: false
      }));
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe(); // Cleanup subscription
  }, [navigate]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(6, "Must be at least 6 characters long")
      .matches(/^[a-zA-Z]+$/, "Password can only contain letters"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formik.values;
    if (formik.isValid) {
      loginWithEmailAndPassword(email, password);
      setLoading(true);
    } else {
      setLoading(false);
      alert("Check your input fields");
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit: handleSubmit });

  return (
    <div className="flex items-center justify-center min-h-screen">
      {loading ? (
        <div className="grid grid-cols-1 justify-items-center items-center">
          <ClipLoader color="#ffffff" size={150} speedMultiplier={0.5} />
        </div>
      ) : (
        <Card className="w-96 bg-white/90 backdrop-filter backdrop-blur-sm">
          <CardHeader
            variant="gradient"
            className="mb-4 grid h-28 place-items-center bg-[#008000]"
          >
            <Typography variant="h3" color="white">
              LOGIN
            </Typography>
          </CardHeader>

          <CardBody className="flex flex-col gap-4">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-2">
                <Input
                  name="email"
                  type="email"
                  label="Email"
                  size="lg"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <Typography variant="small" color="red">
                    {formik.errors.email}
                  </Typography>
                )}
              </div>
              <div className="mt-4 mb-2">
                <Input
                  name="password"
                  type="password"
                  label="Password"
                  size="lg"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && (
                  <Typography variant="small" color="red">
                    {formik.errors.password}
                  </Typography>
                )}
              </div>
              <div className="mb-4"></div>
              <Button label="Login" type="submit" className="w-full h-12 flex items-center justify-center " />
            </form>
          </CardBody>
          <CardFooter className="pt-0">
            <Button label="Sign In with Google" onClick={signInWithGoogle} className="w-full h-12 flex items-center justify-center" />
            <Link to="/reset">
              <p className="ml-1 font-bold font-roboto text-sm text-blue-500 text-center">
                Reset the password
              </p>
            </Link>
            <div className="mt-6 flex items-center font-roboto text-base justify-center">
              Don't have an account?
              <Link to="/register">
                <p className="ml-1 font-bold font-roboto text-sm text-blue-500 text-center">
                  Register
                </p>
              </Link>
            </div>
            {/* Customer Support Button */}
            <div className="mt-4 flex justify-start w-full">
              <Link to="/customer-support" className="text-blue-500 hover:text-blue-700 transition-colors">
                <Button label="Customer Support" />
              </Link>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

export default Login;
