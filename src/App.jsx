import { Children, useEffect, useState } from "react";
import "./App.css";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import { initFlowbite } from "flowbite";
import Layout from "./Components/Layout/layout";
import Mmorpg from "./Components/Mmorpg/Mmorpg";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Pixel from "./Components/Pixel/Pixel";
import Shooter from "./Components/Shooter/Shooter";
import Superhero from "./Components/Superhero/Superhero";
import Notfound from "./Components/Notfound/Notfound";
import Sailig from "./Components/Sailig/Sailig";
import Permadeath from "./Components/Permadeath/Permadeath";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Gamedetailes from "./Components/Gamedetailes/Gamedetailes";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import AuthProtected from "./Components/AuthProtected/AuthProtected";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import ResetCode from "./Components/ResetCode/ResetCode";

function App() {
  const [forgotPasswordVisited, setForgotPasswordVisited] = useState(false);
  const [resetCodeVerified, setResetCodeVerified] = useState(false);
  useEffect(() => {
    initFlowbite();
  }, []);
  const router = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Mmorpg />
            </ProtectedRoute>
          ),
        },

        {
          path: "pixel",
          element: (
            <ProtectedRoute>
              <Pixel />
            </ProtectedRoute>
          ),
        },
        {
          path: "shooter",
          element: (
            <ProtectedRoute>
              <Shooter />
            </ProtectedRoute>
          ),
        },
        {
          path: "superhero",
          element: (
            <ProtectedRoute>
              <Superhero />
            </ProtectedRoute>
          ),
        },

        {
          path: "sailig",
          element: (
            <ProtectedRoute>
              <Sailig />
            </ProtectedRoute>
          ),
        },
        {
          path: "gamedetailes/:id",
          element: (
            <ProtectedRoute>
              <Gamedetailes />
            </ProtectedRoute>
          ),
        },
        {
          path: "permadeath",
          element: (
            <ProtectedRoute>
              <Permadeath />
            </ProtectedRoute>
          ),
        },

        { path: "login", element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "*", element: <Notfound /> },
        { path: "register", element: <Register /> },
        {
          path: "forgot-password",
          element: (
            <AuthProtected>
              <ForgetPassword
                setForgotPasswordVisited={setForgotPasswordVisited}
              />
            </AuthProtected>
          ),
        },
        {
          path: "reset-code",
          element: (
            <AuthProtected>
              {forgotPasswordVisited ? (
                <ResetCode setResetCodeVerified={setResetCodeVerified} />
              ) : (
                <Notfound />
              )}
            </AuthProtected>
          ),
        },
        {
          path: "reset-password",
          element: (
            <AuthProtected>
              <ResetPassword />
            </AuthProtected>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
