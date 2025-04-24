import React, { useState, useEffect } from 'react';

const Header = ({setDisplayCards , dataLength}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Add or remove dark mode class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <>
      <div className=" fixed top-0 left-0 w-full z-50 px-6 py-6 bg-gradient-to-r from-yellow-200 to-purple-300 dark:from-gray-800 dark:to-gray-900 shadow-md flex justify-between items-center rounded-b-2xl transition-all duration-500">
        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white sm:text-4xl tracking-wide drop-shadow-lg">
          🌈 MoodMate <span className="text-purple-600 dark:text-yellow-300">🌦️</span>
        </h1>

        <div className="flex gap-6 items-center text-3xl">
          <div className="relative cursor-pointer hover:scale-110 transition-transform duration-300">
            <span role="img" aria-label="diary" onClick={()=>{setDisplayCards((p)=>!p)}}>📔</span>
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md">
              {dataLength}
            </span>
          </div>
          <span
            onClick={toggleTheme}
            className="cursor-pointer hover:scale-110 transition-transform duration-300"
            role="img"
            aria-label="toggle dark mode"
          >
            {isDarkMode ? '🌙' : '🌞'}
          </span>
        </div>   
      </div>

      <div className="h-28"></div>
    </>
  );
};

export default Header;
