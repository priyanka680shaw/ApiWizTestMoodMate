import React from "react";

const Cards = ({ showCards, entries }) => {
  console.log(entries)
  return (
    <div
      className={`fixed bottom-0 right-0 h-[90%] w-80 bg-white overflow-auto dark:bg-gray-800 shadow-lg transform transition-transform duration-500 z-50 ${
        showCards ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="w-full max-w-4xl mx-auto p-4">
        <h2 className="text-xl font-semibold text-center mb-4 text-gray-800 dark:text-white">
          Your Mood Tracker Entries
        </h2>
        <div className="space-y-4">
          {entries.length > 0 ? (
            entries.map((entry, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border-2 border-gray-300 dark:border-gray-700 transition-transform duration-300 transform hover:scale-105"
              >
                {/* Date and Weather Row */}
                <div className="flex justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {entry.date}/{entry.month}/{entry.year}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    <span role="img" aria-label="weather" className="mr-2">
                      🌤️
                    </span>
                    {entry.weather ? `${entry.weather}°C` : "No weather data"}
                  </p>
                </div>

                {/* Note, Mood, and Feeling Row */}
                <div className="mb-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Note: </strong>
                    {entry.note || "No note provided"}
                  </p>
                </div>
                <div className="mb-3 flex justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Mood: </strong>
                    {entry.mood || "No mood specified"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Feeling: </strong>
                    {entry.feeling || "No feeling specified"}
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
    </div>
  );
};

export default Cards;
