import React, { useState, useEffect } from "react";
import EntryForm from "../components/EntryForm";
import CalendarView from "../components/CalenderView";
import Header from "../components/Header";
import WeatherInfo from "../components/WeatherInfo";
import Cards from "../components/Cards";

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [note, setNote] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("moodTrackerData")) || {};
    setSelectedDate(storedData.selectedDate || null);
    setNote(storedData.note || null);
    setWeatherData(storedData.weatherData || null);
  }, []);

  useEffect(() => {
    if (selectedDate && note && weatherData) {
      const newEntry = {
        date: selectedDate,
        note: note.note,
        mood: note.mood,
        feeling: note.felling,
        weather: {
          temp: weatherData.temp,
          condition: weatherData.condition,
        },
      };

      const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];
      const updatedNotes = [...existingNotes, newEntry];
      localStorage.setItem("notes", JSON.stringify(updatedNotes));

      const currentData = {
        selectedDate,
        note,
        weatherData,
      };
      localStorage.setItem("moodTrackerData", JSON.stringify(currentData));
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
    const simplified = {
      note: noteText.note,
      mood: noteText.mood.emoji,
      felling: noteText.mood.label,
    };
    setNote(simplified);
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
