import { useState } from "react";
import { toast } from "react-toastify";
const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😢", label: "Sad" },
  { emoji: "😠", label: "Angry" },
  { emoji: "😴", label: "Sleepy" },
  { emoji: "🤩", label: "Excited" },
  { emoji: "🤔", label: "Thoughtful" },
  { emoji: "🥳", label: "Celebrating" },
];

const EntryForm = ({ onSave }) => {
  const [selectedMood, setSelectedMood] = useState("");
  const [note, setNote] = useState("");
  const today = new Date().toLocaleDateString();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMood || !note.trim()) {
      toast.success("Your mood has been saved!");
      return;
    }
    const entry = {
      date: today,
      mood: selectedMood,
      note,
    };
    onSave(entry);
    setNote("");
    setSelectedMood("");
    console.log("enter", entry);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative p-6 space-y-6 bg-yellow-50 dark:bg-gray-800 dark:text-white rounded-2xl shadow-lg border border-yellow-300 dark:border-gray-600 transition-all duration-300 transform hover:scale-[1.01]"
    >
      {/* Date Label like sticky note */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-300 dark:bg-gray-600 px-4 py-1 rounded-full text-sm font-semibold text-gray-700 dark:text-white shadow-md border">
        📅 {today}
      </div>

      <h2 className="text-xl font-bold text-center text-yellow-800 dark:text-yellow-400">
        What's your vibe today?
      </h2>

      {/* Mood Selection */}
      <div className="flex flex-wrap justify-center gap-4">
        {moods.map((m) => (
          <button
            key={m.label}
            type="button"
            onClick={() => setSelectedMood(m)}
            className={`text-3xl transition transform hover:scale-125 hover:rotate-6 duration-300 ${
              selectedMood.label === m.label
                ? "ring-4 ring-rose-400 rounded-full"
                : "dark:hover:ring-4 dark:hover:ring-rose-400"
            }`}
            title={m.label}
          >
            {m.emoji}
          </button>
        ))}
      </div>

      {/* Note Input */}
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Dear Diary... 📖"
        className="w-full p-3 border-2 border-yellow-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-600 transition placeholder:text-sm resize-none dark:bg-gray-700 dark:text-white"
        rows={4}
      />

      {/* Save Button */}
      <button
        type="submit"
        className="w-full py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-semibold rounded-lg shadow-md hover:from-amber-500 hover:to-orange-500 transition-all duration-300 dark:from-gray-600 dark:to-gray-500 dark:hover:from-gray-700 dark:hover:to-gray-600"
      >
        💾 Save Mood Entry
      </button>
    </form>
  );
};

export default EntryForm;
