

export const getWeatherData = async (lat, lon, apiKey) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  