import React, { useState } from "react";
import { login, createUser } from "../api";
import { useNavigate } from "react-router-dom";
import logo from "../public/images/logo4.png"; // Adjust the path to your logo file

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUser({ name, username, email, password });
      alert("Account created successfully! You can now log in.");
      setShowSignUp(false);
    } catch (error) {
      console.error("Sign Up failed:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 to-red-500 animate-gradient">
      <img 
        src={logo} 
        alt="App Logo" 
        className="w-128 h-auto mb-6 filter brightness-110 contrast-125 animate-bounce" 
      />
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-xl w-96 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transform transition-all duration-300 hover:scale-105"
          >
            Login
          </button>
        </form>
        <button
          onClick={() => setShowSignUp(true)}
          className="w-full mt-4 p-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none transform transition-all duration-300 hover:scale-105"
        >
          Sign Up
        </button>
      </div>

      {showSignUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 transform transition-all duration-500 hover:scale-105">
            <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>
            <form onSubmit={handleSignUp}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full p-3 mb-3 border border-gray-300 rounded-md transition duration-300 ease-in-out"
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="User Name"
                className="w-full p-3 mb-3 border border-gray-300 rounded-md transition duration-300 ease-in-out"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-3 mb-3 border border-gray-300 rounded-md transition duration-300 ease-in-out"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 mb-4 border border-gray-300 rounded-md transition duration-300 ease-in-out"
              />
              <button
                type="submit"
                className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transform transition-all duration-300 hover:scale-105"
              >
                Create Account
              </button>
            </form>
            <button
              onClick={() => setShowSignUp(false)}
              className="w-full mt-2 p-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transform transition-all duration-300 hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
