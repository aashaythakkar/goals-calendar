import React from "react";
import logo from "../public/images/logo4.png";

function SidePane() {
  return (
    <div className="w-64 bg-gradient-to-r from-orange-500 to-orange-400 text-white p-4">
      <img src={logo} alt="App Logo" className="w-auto h-auto mb-6" />
      <h2 className="text-lg font-bold mb-4">Options</h2>
      <ul>
        <li className="mb-2">
          <button className="text-left w-full">Add Goal</button>
        </li>
        <li>
          <button className="text-left w-full">Manage Categories</button>
        </li>
      </ul>
    </div>
  );
}

export default SidePane;
