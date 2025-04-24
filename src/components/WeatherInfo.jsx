import React, { useEffect, useState } from "react";
import { getWeatherData } from "../utils/WeatherApi";

const WeatherInfo = ({ onWeatherData }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // Only run once when the component mounts
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const API_KEY = "82702c59a4c26c2d414b8b9c538942a5";

      const data = await getWeatherData(lat, lon, API_KEY);
      
      // Simplify the weather data
      const simplifiedData = {
        name: data.name,
        temp: data.main.temp,
        humidity: data.main.humidity,
      };

      setWeather(simplifiedData);  // Update state with simplified data

      // Send the simplified data to the parent component
      if (onWeatherData) {
        onWeatherData(simplifiedData);  // Send only required data to the parent
      }
    });
  }, []); // Empty dependency array means this will run only once

  return (
    <div className="max-w-xs mx-auto mt-6 px-4 py-2 bg-gradient-to-br from-yellow-100 to-purple-200 dark:from-gray-800 dark:to-gray-900 dark:text-white rounded-xl shadow-lg text-center transition-all duration-500">
      {weather ? (
        <>
          <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2">{weather.name}</h3>
          <div className="flex flex-col items-center space-y-1">
            <p className="text-4xl font-bold text-purple-700 dark:text-purple-400">🌡️ {weather.temp}°C</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">💧 Humidity: {weather.humidity}%</p>
          </div>
        </>
      ) : (
        <p className="text-gray-500 dark:text-gray-300">Fetching weather info... ⏳</p>
      )}
    </div>
  );
};

export default WeatherInfo;
