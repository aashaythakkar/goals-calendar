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
          const formattedGoals = goalData.map((goal) => ({
            ...goal,
            categoryColor: goal.Category.categoryColor,
          }));
          setGoals(formattedGoals);

          const taskData = await getTasks(token);
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
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="h-screen flex bg-gradient-to-r from-orange-400 to-orange-500">
      <SidePane />
      <div className="flex-1 flex flex-col">
        <header className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-6 flex justify-between items-center shadow-md">
          <h1 className="text-2xl font-semibold">Goal Tracker Calendar</h1>
          <nav>
            <button
              onClick={handleLogout}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out"
            >
              Logout
            </button>
          </nav>
        </header>
        <main className="flex-1 p-6 bg-gradient-to-r from-orange-400 to-orange-500 rounded-t-3xl shadow-lg mt-6">
          <BigCalendar goals={goals} tasks={tasks} />
        </main>
      </div>
    </div>
  );
}

export default CalendarPage;
