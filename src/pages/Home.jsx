import React, { useState, useEffect } from "react";
import EntryForm from "../components/EntryForm";
import CalendarView from "../components/CalenderView";
import Header from "../components/Header";
import WeatherInfo from "../components/WeatherInfo";
import Cards from "../components/Cards";
import { toast } from "react-toastify";

const Home = () => {
  const [selectedDate, setSelectedDate] = useState({ day: "", month: "", year: "" });
  const [note, setNote] = useState({ note: "", mood: "", felling: "" });
  const [weatherData, setWeatherData] = useState(null);
  const [displayCards, setDisplayCards] = useState(false);
  const [dataLength, setDataLength] = useState("0");
  const [entries, setEntries] = useState([]);

  // Load existing entries on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("moodTrackerEntries")) || [];
    setEntries(stored);
  }, []);

  // Save data to localStorage and update entries state
  useEffect(() => {
    if (selectedDate.day && selectedDate.month && note.note && note.mood) {
      const newEntry = {
        date: selectedDate.day,
        month: selectedDate.month,
        year: selectedDate.year,
        note: note.note,
        mood: note.mood,
        feeling: note.felling,
      };

      const existingEntries = JSON.parse(localStorage.getItem("moodTrackerEntries")) || [];
      const updatedEntries = [...existingEntries, newEntry];
      localStorage.setItem("moodTrackerEntries", JSON.stringify(updatedEntries));
      setEntries(updatedEntries); // Update state to reflect change in UI immediately
      console.log("Data saved to localStorage:", newEntry);
      toast.success("note added successfully !")
    }
  }, [selectedDate, note, weatherData]);

  // Update count when entries change
  useEffect(() => {
    setDataLength(entries.length);
  }, [entries]);

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

  //handle the deleteEnter
  const handleDeleteEnter = (idxToDelete)=>{
      const updateEnteries = entries.filter((data , idx)=> idx !== idxToDelete)
      setEntries(updateEnteries)
      localStorage.setItem("moodTrackerEntries" , JSON.stringify(updateEnteries))
      toast.error("Entry deleted successfully!");
  }
  return (
    <div className="w-full min-h-screen bg-red-100 dark:bg-gray-900 transition-colors duration-500 ">
      {/* Header */}
      <Header setDisplayCards={setDisplayCards} dataLength={dataLength} />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-start px-4">
        {/* Weather Info */}
        <div className="mb-2 w-full max-w-4xl">
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

      {/* Cards Section */}
      <Cards showCards={displayCards} entries={entries} onDelete = {handleDeleteEnter}/>
    </div>
  );
};

export default Home;
