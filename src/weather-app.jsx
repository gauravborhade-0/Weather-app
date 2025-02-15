import { useState } from "react";
import "./weather-app.css";
import cloud from './assets/cloudy.png'

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "0f9b5c01fbc34c048eb163644250802"; // Replace with your actual API key

  const getWeather = async () => {
    if (!city) {
      alert("Please enter a city name");
      return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        setError("City not found!");
        setWeather(null);
      } else {
        setWeather(data);
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching weather data", err);
      setError("Error fetching data!");
      setWeather(null);
    }
  };

  return (
    <div className="weather-app">
      <div className="glass-card">
        <h2><img className="cloud" src={cloud}alt="" /> Weather App</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getWeather}>🔍 </button>
        </div>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-details">
            <h3>{weather.location.name}, {weather.location.country}</h3>
            <p className="temperature">{weather.current.temp_c}°C</p>
            <p>{weather.current.condition.text}</p>
            <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
            <p>💧 Humidity: {weather.current.humidity}%</p>
            <p>🌬️ Wind: {weather.current.wind_kph} km/h</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
