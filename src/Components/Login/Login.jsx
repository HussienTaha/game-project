import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext/UserContext";

export default function Login() {
  const { setToken } = useContext(UserContext);
  const [isloding, setIsloding] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  async function handleLogin(values) {
    console.log(values);

    try {
      setIsloding(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      console.log(data);

      if (data.message === "success") {
        navigate("/"); 
        setToken(data.token)
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Incorrect email or password");
    } finally {
      setIsloding(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/^[A-Z].{5,}/, "First character must be uppercase")
        .required("Password is required"),
    }),
    onSubmit: handleLogin,
  });

  return (
    <div
      className="h-full w-full min-h-screen flex items-center justify-center bg-cover bg-center -mt-16  p-6"
      style={{ backgroundImage: "url('/registerimge.jpg')" }}
    >
      <div
        className="max-w-md w-full p-6 shadow-lg text-gray-300 bg-opacity-90 rounded-lg"
        style={{ backgroundColor: "#042727" }}
      >
        <h2 className="text-2xl font-bold text-center text-pink-950 mb-4">
          Login Form
        </h2>

        {errorMsg && (
          <p className="text-red-500 text-sm text-center mb-2">{errorMsg}</p>
        )}

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              type="email"
              name="email"
              className="w-full p-2 border rounded-md text-gray-300 bg-gray-800"
              placeholder="Email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              type="password"
              name="password"
              className="w-full p-2 border text-gray-300 bg-gray-800 rounded-md"
              placeholder="Password"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-pink-950 text-gray-300 p-2 rounded-md hover:bg-gray-600 transition flex justify-center"
          >
            {isloding ? <FaSpinner className="animate-spin" /> : "Login"}
          </button>

          <NavLink
            to="/forgot-password"
            className="block text-center text-pink-950 text-lg font-bold hover:text-gray-600 mt-2"
          >
            Forgot Password?
          </NavLink>
        </form>
      </div>
    </div>
  );
}
