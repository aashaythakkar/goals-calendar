// src/components/MainView.js
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainView = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />
        <div className="mt-8">
          <h2 className="text-xl">Your Goals</h2>
          {/* Add calendar or goal list here */}
          <div className="mt-4 bg-gray-100 p-6 rounded-lg shadow">
            <p>No goals yet. Start by creating one!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainView;
