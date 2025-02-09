import React, { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import logo from "../public/images/logo4.png"; // Adjust the path to your logo file

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = { email, password };
      const response = await login(credentials);
      localStorage.setItem("token", response.token);
      navigate("/calendar");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 to-red-500">
        <img src={logo} alt="App Logo" className="w-128 h-auto mb-6 filter brightness-110 contrast-125"/>
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-xl w-96">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
