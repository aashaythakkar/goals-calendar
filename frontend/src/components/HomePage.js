import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const HomePage = () => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("month"); // Options: "day", "week", "month", "year"

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <button onClick={() => setView("day")} className="btn">Day</button>
        <button onClick={() => setView("week")} className="btn">Week</button>
        <button onClick={() => setView("month")} className="btn">Month</button>
        <button onClick={() => setView("year")} className="btn">Year</button>
      </div>

      <Calendar
        onChange={setDate}
        value={date}
        view={view} // this is where you toggle the view
        showNeighboringMonth={false}
      />
    </div>
  );
};

export default HomePage;
