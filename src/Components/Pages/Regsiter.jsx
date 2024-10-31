import React, { useState, useContext, useEffect } from "react";
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

  const initialValues = {
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
      .matches(/^[a-zA-Z]+ $/, "Password can only contain letters"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = formik.values;
    if (formik.isValid) {
      registerWithEmailAndPassword(name, email, password);
      setLoading(true);
    } else {
      setLoading(false);
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