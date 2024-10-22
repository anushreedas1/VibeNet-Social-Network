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

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, loginWithEmailAndPassword } = useContext(AuthContext);
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
    if (formik.isValid === true) {
      loginWithEmailAndPassword(email, password);
      setLoading(true);
    } else {
      setLoading(false);
      alert("Check your input fields");
    }
  };

  const formik = useFormik({ initialValues, validationSchema, handleSubmit });

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 justify-items-center items-center h-screen">
          <ClipLoader color="#367fd6" size={150} speedMultiplier={0.5} />
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-blue-500">
          <div className="flex flex-col items-center">
            <Typography
              variant="h2"
              color="white"
              className="mb-10 font-bold text-4xl"
            >
              Welcome Back!
            </Typography>

            <Card className="w-96 bg-gray-800 shadow-lg rounded-lg">
              <CardHeader
                variant="gradient"
                className="mb-4 h-20 grid place-items-center bg-gradient-to-r from-purple-700 to-blue-500 rounded-t-lg"
              >
                <Typography variant="h4" color="white">
                  Login
                </Typography>
              </CardHeader>
              <CardBody className="flex flex-col gap-6 px-8">
                <form onSubmit={handleSubmit}>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      label="E-mail"
                      size="lg"
                      className="bg-white text-black placeholder-black border border-gray-400 p-2 rounded"
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <Typography variant="small" color="red" className="mt-1 font-bold">
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
                      className="bg-white text-black placeholder-black border border-gray-400 p-2 rounded"
                      {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <Typography variant="small" color="red" className="mt-1 font-bold">
                        {formik.errors.password}
                      </Typography>
                    )}
                  </div>
                  <Button
                    variant="gradient"
                    fullWidth
                    className="mt-6 bg-black text-white border border-gray-400"
                    type="submit"
                  >
                    Login
                  </Button>
                </form>
              </CardBody>
              <CardFooter className="pt-0 px-8 pb-4">
                <Button
                  variant="gradient"
                  fullWidth
                  className="mb-4 bg-black text-white border border-gray-400"
                  onClick={signInWithGoogle}
                >
                  Sign In with Google
                </Button>
                <div className="flex justify-between text-white text-sm">
                  <Link to="/reset" className="hover:underline">
                    Forgot password?
                  </Link>
                  <Link to="/register" className="hover:underline">
                    Don't have an account? Signup
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
