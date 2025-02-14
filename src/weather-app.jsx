import  { useState } from "react";
import "./weather-app.css";
// import img from './assets/image.png'

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

  const getBackgroundImage = () => {
    if (!weather) return "default.jpg";
    const condition = weather.current.condition.text.toLowerCase();
    if (condition.includes("rain")) return "rainy.jpg";
    if (condition.includes("cloud")) return "cloudy.jpg";
    if (condition.includes("clear")) return "clear.jpg";
    if (condition.includes("snow")) return "snowy.jpg";
    return "default.jpg";
  };

  return (
    <div className="weather-container" style={{ backgroundImage: `url(${getBackgroundImage()})` }}>
      {/* <img src={img} alt="" /> */}
      <div className="left-panel"  >
        <h2>The Only Weather Forecast You Need</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter location"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getWeather}>🔍</button>
        </div>
      </div>
      <div className="right-panel">
        <h3>Today</h3>
        {error && <p className="error-text">{error}</p>}
        {weather && (
          <div className="weather-info">
            <h3>{weather.location.name}, {weather.location.country}</h3>
            <p className="temperature">{weather.current.temp_c}°C</p>
            <p>{weather.current.condition.text}</p>
            <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
            <p>Humidity: {weather.current.humidity}%</p>
            <p>Wind Speed: {weather.current.wind_kph} km/h</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
