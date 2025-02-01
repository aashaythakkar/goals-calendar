// src/components/Sidebar.js
import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-60 bg-gray-800 text-white p-6">
      <h2 className="text-xl mb-4">Navigation</h2>
      <ul className="space-y-2">
        <li><a href="/goals" className="hover:text-gray-400">Goals</a></li>
        <li><a href="/categories" className="hover:text-gray-400">Categories</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
