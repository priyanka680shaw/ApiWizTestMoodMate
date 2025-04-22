import React, { useEffect, useState } from "react";

const Cards = () => {
  const [notes, setNotes] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("moodTrackerEntries")) || []; // Retrieve saved notes from localStorage
    setNotes(savedNotes); // Update state with the loaded notes
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
        Your Mood Tracker Entries
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.length > 0 ? (
          notes.map((entry, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-gray-300 dark:border-gray-700 transition-transform duration-300 transform hover:scale-105"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  {entry.date}/{entry.month}/{entry.year}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Note: </strong>
                  {entry.note || "No note provided"}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Mood: </strong>
                  {entry.mood || "No mood specified"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Feeling: </strong>
                  {entry.feeling || "No feeling specified"}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Weather: </strong>
                  {entry.weather ? `${entry.weather}°C` : "No weather data"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-300">
            No entries yet
          </p>
        )}
      </div>
    </div>
  );
};

export default Cards;
