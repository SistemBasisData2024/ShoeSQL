import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoSql from "./assets/logoShoesql.jpg";
import "./App.css";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .get("http://localhost:5000/login", {
        params: {
          username: username,
          password: password,
        },
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("id", res.data.user.id);
      })
      .catch((err) => {});
  };

  const handleToRegister = () => {
    navigate("/register");
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
        <h1 className="text-2xl font-semibold mb-4">Welcome to ShoeSQL</h1>
        <div>
          <div className="mb-4">
            <label className="block text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="text-blue-500"
            />
            <label className="text-gray-600 ml-2">Remember Me</label>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>

        <div className="mt-6 text-blue-500 text-center">
          <a href="" className="hover:underline" onClick={handleToRegister}>
            Sign up Here
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
