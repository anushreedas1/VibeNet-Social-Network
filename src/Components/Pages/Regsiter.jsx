import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../AppContext/AppContext"; // Ensure you're importing AuthContext
import { auth, onAuthStateChanged, createUserWithEmailAndPassword } from "../firebase/firebase";

const Register = () => {  // Corrected spelling from "Regsiter" to "Register"
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext); // Access setUser from context

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set user state in context
        navigate("/");
      }
      setLoading(false);
    });
    
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [navigate, setUser]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Required")
      .min(4, "Must be at least 4 characters long")
      .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(6, "Must be at least 6 characters long")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()]+$/, "Password must contain letters and numbers"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formik.values;

    if (formik.isValid) {
      setLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user; // Get user info from userCredential
        setUser(user); // Set user state in context
        navigate("/");  // Navigate after successful registration
      } catch (error) {
        alert("Registration failed: " + error.message);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Check your input fields");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#367fd6" size={150} speedMultiplier={0.5} />
        </div>
      ) : (
        <Card className="w-96 bg-white/80 backdrop-blur-md shadow-xl">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              REGISTER
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4 px-6">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <Input
                  type="text"
                  label="Name"
                  size="lg"
                  {...formik.getFieldProps("name")}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                />
                {formik.touched.name && formik.errors.name && (
                  <Typography variant="small" color="red" className="mt-1">
                    {formik.errors.name}
                  </Typography>
                )}
              </div>
              <div className="mb-4">
                <Input
                  type="email"
                  label="Email"
                  size="lg"
                  {...formik.getFieldProps("email")}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                />
                {formik.touched.email && formik.errors.email && (
                  <Typography variant="small" color="red" className="mt-1">
                    {formik.errors.email}
                  </Typography>
                )}
              </div>
              <div className="mb-4">
                <Input
                  type="password"
                  label="Password"
                  size="lg"
                  {...formik.getFieldProps("password")}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                />
                {formik.touched.password && formik.errors.password && (
                  <Typography variant="small" color="red" className="mt-1">
                    {formik.errors.password}
                  </Typography>
                )}
              </div>
              <Button type="submit" variant="gradient" fullWidth>
                Register
              </Button>
            </form>
          </CardBody>
          <CardFooter className="pt-0 px-6">
            <div className="flex flex-col items-center gap-2">
              <span className="text-gray-700">Already have an account?</span>
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Register;
