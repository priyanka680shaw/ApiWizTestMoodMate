import React, { useEffect, useState } from 'react';

const Cards = () => {
  const [notes, setNotes] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">Your Notes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.length > 0 ? (
          notes.map((entry, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-300"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {entry.date?.day}/{entry.date?.month}/{entry.date?.year}
              </h3>
              <p className="text-gray-600 mb-2">📝 {entry.note}</p>
              <p className="text-gray-600 mb-2">😊 Mood: {entry.mood}</p>
              <p className="text-gray-600 mb-2">🎭 Feeling: {entry.feeling}</p>
              <p className="text-gray-600">🌤 Weather: {entry.weather?.temp}, {entry.weather?.condition}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No notes yet</p>
        )}
      </div>
    </div>
  );
};

export default Cards;
