import  { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import { FaSpinner } from "react-icons/fa";
import { UserContext } from "../UserContext/UserContext";

export default function Register() {  
const{setToken}= useContext(UserContext)
  const [errorMsg, seterrorMsg] = useState("");
  const [isloding, setisloding] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string() 
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters and first char is captel")
        .required("Password is required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("rePassword is required"),
      phone: Yup.string()
        .matches(
          /^(\+20|0)1[0-9]{9}$/,
          "Phone number must be a valid Egyptian number"
        )
        .required("Phone number is required"),
    }),
    onSubmit: handleSubmit,
  });
  async function handleSubmit(values) {
    // alert(JSON.stringify(values, null, 2));
    try {
      setisloding(true)
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
   
      console.log(data);
      if (data.message == "success") {
        navigate("/");
        setToken(data.token)
      }
     
    } catch (error) {
      console.log(error);
      seterrorMsg("email alerdy exist");
    }
    finally{
      setisloding(false)
     
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center -mt-16 p-6"
      style={{ backgroundImage: "url('/registerimge.jpg')" }}
    >
      <div
        className="max-w-md w-full p-6 shadow-lg text-gray-300 bg-opacity-90 rounded-lg"
        style={{ backgroundColor: "#042727" }}
      >
        <h2 className="text-2xl font-bold text-center text-pink-950 mb-4">
          Register Form
        </h2>
        {errorMsg ? (
          <p className="text-red-500 text-sm text-center mb-2">email alerdy exist</p>
        ) : null}
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              className="w-full p-2 border rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              name="rePassword"
              className="w-full p-2 border rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder=" rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.rePassword && formik.errors.rePassword && (
              <p className="text-red-500 text-sm">{formik.errors.rePassword}</p>
            )}
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              className="w-full p-2 border rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Your phone number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm">{formik.errors.phone}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-pink-950 text-gray-300 p-2 rounded-md hover:bg-gray-600 transition"
          >
            {isloding ? <FaSpinner className="animate-spin  mx-auto"/>  : " register"}
          </button>
        </form>
      </div>
    </div>
  );
}
