import React, { useState, useEffect } from "react";
import EntryForm from "../components/EntryForm";
import CalendarView from "../components/CalenderView";
import Header from "../components/Header";
import WeatherInfo from "../components/WeatherInfo";
import Cards from "../components/Cards";

const Home = () => {
  const [selectedDate, setSelectedDate] = useState({ day: "", month: "" , year : ""});
  const [note, setNote] = useState({ note: "", mood: "", felling: "" });
  const [weatherData, setWeatherData] = useState(null);

  // Load weather data when it changes
  useEffect(() => {
    // Check if all required data is available
    if (selectedDate.day && selectedDate.month && note.note && note.mood && weatherData) {
      const newEntry = {
        date: selectedDate.day,
        month: selectedDate.month,
        year: selectedDate.year,
        note: note.note,
        mood: note.mood,
        feeling: note.felling,
        weather: weatherData.temp,
      };

      // Retrieve existing entries from localStorage, or initialize an empty array
      const existingEntries = JSON.parse(localStorage.getItem("moodTrackerEntries")) || [];

      // Append the new entry to the existing entries
      existingEntries.push(newEntry);

      // Save the updated entries array back to localStorage
      localStorage.setItem("moodTrackerEntries", JSON.stringify(existingEntries));

      console.log("Data saved to localStorage:", newEntry);
    }
  }, [selectedDate, note, weatherData]);

  const handleWeatherData = (data) => {
    setWeatherData(data);
  };

  const handleCalendarChange = (date) => {
    const formattedDate = {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
    setSelectedDate(formattedDate);
  };

  const handleNoteChange = (noteText) => {
    if (noteText && noteText.mood) {
      const simplified = {
        note: noteText.note || "",
        mood: noteText.mood.emoji || "",
        felling: noteText.mood.label || "",
      };
      setNote(simplified);
    } else {
      console.error("Invalid noteText", noteText);
    }
  };

  return (
    <div className="w-full min-h-screen bg-red-100 dark:bg-gray-900 transition-colors duration-500">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-start p-4">
        {/* Weather Info */}
        <div className="mb-4 w-full max-w-4xl">
          <WeatherInfo onWeatherData={handleWeatherData} />
        </div>

        {/* Entry & Calendar */}
        <div className="w-full max-w-4xl bg-yellow-100 dark:bg-gray-800 dark:text-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between gap-6 transition-all duration-500">
          <div className="w-full md:w-1/2">
            <EntryForm onSave={handleNoteChange} />
          </div>
          <div className="w-full md:w-1/2">
            <CalendarView onCalendarChange={handleCalendarChange} />
          </div>
        </div>
      </div>

      {/* Cards */}
      <Cards />
    </div>
  );
};

export default Home;
