import React, { useEffect, useState } from "react";
import BigCalendar from "../components/BigCalendar";
import SidePane from "../components/SidePane";
import { getGoals, getTasks } from "../api"; // Import both API calls

function CalendarPage() {
  const [goals, setGoals] = useState([]);
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const fetchGoalsAndTasks = async () => {
        try {
          const goalData = await getGoals(token);
          console.log("Goals:", goalData);
          console.log("Category:",goalData.category);
          const formattedGoals = goalData.map((goal) => ({
            ...goal,
            categoryColor: goal.Category.categoryColor,
          }));
          setGoals(formattedGoals);
  
          const taskData = await getTasks(token);
          console.log("Tasks:", taskData);
          const formattedTasks = taskData.map((task) => ({
            ...task,
            goalData: task.Goal || null, // Include related Goal data
            categoryColor: task.Category.categoryColor,
          }));
          setTasks(formattedTasks);
        } catch (error) {
          console.error("Error fetching goals and tasks:", error);
        }
      };
      fetchGoalsAndTasks();
    }
  }, [token]); // Only depend on token to avoid re-triggering the effect
  
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="h-screen flex">
      <SidePane />
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <h1 className="text-lg font-bold">Goal Tracker Calendar</h1>
          <nav>
            <button
              onClick={handleLogout}
              className="bg-blue-500 px-3 py-1 rounded-md"
            >
              Logout
            </button>
          </nav>
        </header>
        <main className="flex-1 bg-gray-100 p-4">
          <BigCalendar goals={goals} tasks={tasks} />
        </main>
      </div>
    </div>
  );
}

export default CalendarPage;
