import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CustomCalendar.css"; // We'll override styles in this file

const CalendarComponent = ({ onCalendarChange }) => {
  const [value, setValue] = useState(new Date());

  // When the date changes, update the state and notify the parent
  const handleDateChange = (newDate) => {
    setValue(newDate);
    if (onCalendarChange) onCalendarChange(newDate); // Ensure the parent callback exists
  };

  return (
    <div className="p-6 w-full max-w-md mx-auto bg-gradient-to-br from-pink-100 via-yellow-100 to-purple-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 rounded-3xl shadow-xl dark:text-white">
      <h2 className="text-2xl font-semibold text-center text-purple-800 dark:text-yellow-300 mb-5">
        📅 Your Mood Calendar
      </h2>
      <div className="calendar-wrapper rounded-lg overflow-hidden">
        <Calendar
          onChange={handleDateChange}
          value={value}
          className="dark:bg-gray-800 dark:text-white"
        />
      </div>
      <p className="mt-6 text-center text-lg font-medium text-gray-700 dark:text-gray-300">
        🗓️ Selected Date:{" "}
        <span className="text-purple-700 dark:text-purple-400 font-bold">
          {value.toDateString()}
        </span>
      </p>
    </div>
  );
};

export default CalendarComponent;
