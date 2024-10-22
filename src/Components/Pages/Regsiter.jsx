import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Input, Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../AppContext/AppContext";
import { auth, onAuthStateChanged } from "../firebase/firebase";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { registerWithEmailAndPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [navigate]);

  let initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Required")
      .min(4, "Must be at least 4 characters long")
      .matches(/^[a-zA-Z]+$/, "Name can only contain letters"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(6, "Must be at least 6 characters long")
      .matches(/^[a-zA-Z]+$/, "Password can only contain letters"),
  });

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, email, password } = formik.values;
    if (formik.isValid === true) {
      registerWithEmailAndPassword(name, email, password);
      setLoading(true);
    } else {
      setLoading(false);
      alert("Check your input fields");
    }
  };

  const formik = useFormik({ initialValues, validationSchema, handleRegister });

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 justify-items-center items-center h-screen">
          <ClipLoader color="#367fd6" size={150} speedMultiplier={0.5} />
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-blue-500">
          <Card className="w-96 bg-gray-800 shadow-lg rounded-lg">
            <CardHeader
              variant="gradient"
              className="mb-4 h-20 grid place-items-center bg-gradient-to-r from-purple-700 to-blue-500 rounded-t-lg border-b border-black"
            >
              <Typography variant="h4" color="white">
                REGISTER
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-6 px-8">
              <form onSubmit={handleRegister}>
                <div>
                  <Input
                    name="name"
                    type="text"
                    label="Name"
                    size="lg"
                    className="bg-white text-black placeholder-gray-500"
                    {...formik.getFieldProps("name")}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <Typography variant="small" color="red" className="mt-1">
                      {formik.errors.name}
                    </Typography>
                  )}
                </div>
                <div className="mt-4">
                  <Input
                    name="email"
                    type="email"
                    label="Email"
                    size="lg"
                    className="bg-white text-black placeholder-gray-500"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <Typography variant="small" color="red" className="mt-1">
                      {formik.errors.email}
                    </Typography>
                  )}
                </div>
                <div className="mt-4">
                  <Input
                    name="password"
                    type="password"
                    label="Password"
                    size="lg"
                    className="bg-white text-black placeholder-gray-500"
                    {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <Typography variant="small" color="red" className="mt-1">
                      {formik.errors.password}
                    </Typography>
                  )}
                </div>
                {/* Adding margin above the Register button to match the spacing */}
                <Button
                  variant="gradient"
                  fullWidth
                  type="submit"
                  className="mt-4 mb-4 border border-black" // Added mt-4 for spacing
                >
                  Register
                </Button>
              </form>
            </CardBody>
            <CardFooter className="pt-0">
              <div className="mt-6 flex font-roboto text-base justify-center">
                Already have an account?
                <Link to="/login">
                  <p className="ml-1 font-bold text-blue-500 text-center">
                    Login
                  </p>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default Register;
