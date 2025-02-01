// src/components/Header.js
import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-2xl">Goal Tracker</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="/goals" className="hover:underline">Goals</a></li>
          <li><a href="/categories" className="hover:underline">Categories</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
