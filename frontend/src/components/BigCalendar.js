import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const BigCalendar = ({ goals, tasks }) => {
  const [events, setEvents] = useState([...goals, ...tasks]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleAddEvent = (slotInfo) => {
    const newEvent = {
      id: events.length + 1,
      title: "New Event",
      start: slotInfo.start,
      end: slotInfo.end,
    };
    setEvents([...events, newEvent]);
  };

  useEffect(() => {
    const formattedEvents = [
      ...goals.map((goal) => ({
        ...goal,
        start: new Date(goal.startdate),
        end: new Date(goal.enddate),
        categoryColor: goal.Category?.categoryColor, // Add category color
        isTask: false, // Mark as goal
      })),
      ...tasks.map((task) => ({
        ...task,
        start: new Date(task.date),
        end: new Date(task.date),
        categoryColor: task.Category?.categoryColor, // Add category color
        isTask: true, // Mark as task
      })),
    ];
    setEvents(formattedEvents);
  }, [goals, tasks]);

  const eventStyleGetter = (event) => {
    let backgroundColor = event.categoryColor || "#ff0";
    let borderColor = event.isTask ? "blue" : "green"; // Blue for tasks, green for goals
    return {
      style: {
        backgroundColor,
        borderColor,
        borderStyle: "solid",
        color: "#fff", // Ensure text is visible
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
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleAddEvent}
          eventPropGetter={eventStyleGetter} // Apply the custom styles
        />
      </div>

      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-2">{selectedEvent.title}</h2>
            <p>Start: {selectedEvent.start.toString()}</p>
            <p>End: {selectedEvent.end.toString()}</p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => {
                setEvents(events.filter((e) => e.id !== selectedEvent.id));
                setShowModal(false);
              }}
            >
              Delete
            </button>
            <button
              className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BigCalendar;
