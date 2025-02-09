import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import { createTask, createGoal, createCategory, getCategories } from "../api";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const BigCalendar = ({ goals, tasks }) => {
  const [events, setEvents] = useState([...goals, ...tasks]);
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isTask, setIsTask] = useState(true);
  const [title, setTitle] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: "", description: "", categoryColor: "" });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const formattedEvents = [
      ...goals.map(goal => ({ ...goal, start: new Date(goal.startdate), end: new Date(goal.enddate), categoryColor: goal.Category?.categoryColor, isTask: false })),
      ...tasks.map(task => ({ ...task, start: new Date(task.date), end: new Date(task.date), categoryColor: task.Category?.categoryColor, isTask: true })),
    ];
    setEvents(formattedEvents);
  }, [goals, tasks]);

  const handleAddEvent = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!title || !selectedCategory) return;
    const newEvent = { title, date: selectedDate, category_id: selectedCategory, goalId: isTask ? selectedGoal : null };
    try {
      const createdEvent = isTask ? await createTask(newEvent) : await createGoal(newEvent);
      setEvents([...events, createdEvent]);
      setShowModal(false);
      setTitle("");
      setSelectedGoal(null);
      setSelectedCategory("");  // Clear category selection after event creation
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleCategorySubmit = async () => {
    if (!newCategory.name || !newCategory.categoryColor) return;
    try {
      const createdCategory = await createCategory(newCategory);
      setCategories([...categories, createdCategory]);  // Update categories state
      setShowCategoryModal(false);
      setNewCategory({ name: "", description: "", categoryColor: "" });
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = event.categoryColor || "#ff0";
    let borderColor = event.isTask ? "blue" : "green";
    return {
      style: {
        backgroundColor,
        borderColor,
        borderStyle: "solid",
        color: "#fff",
      },
    };
  };

  return (
    <div className="flex h-screen">
      <div className="w-3/4 p-4">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "80vh" }}
          selectable
          onSelectSlot={handleAddEvent}
          eventPropGetter={eventStyleGetter}
        />
      </div>

      <div className="fixed bottom-4 right-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setShowCategoryModal(true)}
        >
          Create Category
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-2">Create {isTask ? "Task" : "Goal"}</h2>
            <input
              type="text"
              className="border p-2 w-full"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="mt-2">
              <label className="mr-2">Type:</label>
              <button
                className={`px-3 py-1 rounded ${isTask ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                onClick={() => setIsTask(true)}
              >
                Task
              </button>
              <button
                className={`ml-2 px-3 py-1 rounded ${!isTask ? "bg-green-500 text-white" : "bg-gray-300"}`}
                onClick={() => setIsTask(false)}
              >
                Goal
              </button>
            </div>

            {/* Category Dropdown */}
            <div className="mt-2">
              <label className="mr-2">Category:</label>
              <select
                className="border p-2 w-full"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {isTask && (
              <div className="mt-2">
                <label>Assign to Goal (optional):</label>
                <select
                  className="border p-2 w-full"
                  value={selectedGoal || ""}
                  onChange={(e) => setSelectedGoal(e.target.value)}
                >
                  <option value="">Standalone Task</option>
                  {goals.map((goal) => (
                    <option key={goal.id} value={goal.id}>
                      {goal.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                onClick={handleSubmit}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-2">Create Category</h2>
            <input
              type="text"
              className="border p-2 w-full"
              placeholder="Category name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
            <input
              type="text"
              className="border p-2 w-full mt-2"
              placeholder="Category description"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            />
            <input
              type="color"
              className="mt-2"
              value={newCategory.categoryColor}
              onChange={(e) => setNewCategory({ ...newCategory, categoryColor: e.target.value })}
            />
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                onClick={handleCategorySubmit}
              >
                Save Category
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={() => setShowCategoryModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BigCalendar;
