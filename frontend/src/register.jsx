import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";
import logoSql from "./assets/logoShoesql.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const navigate = useNavigate(); // Define navigate here

  const handleRegister = async (e) => {
    toast.success("Registered successfully");
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/register", {
        name: username,
        password,
      });

      setUser(response.data.user);
      console.log("User registered:", response.data.user);
      setRedirectToLogin(true);
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }

    if (redirectToLogin) {
      navigate("/");
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src={logoSql}
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Register Your Account</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label for="username" className="block text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autocomplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label for="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autocomplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label for="ConfirmPassword" className="block text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autocomplete="off"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            onClick={handleRegister}
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Register
          </button>
        </form>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default Register;
