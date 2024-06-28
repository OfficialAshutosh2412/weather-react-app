import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState(null);
  const [feeling, setFeeling] = useState(null);
  const [humid, setHumid] = useState(null);
  const [press, setPressure] = useState(null);
  const [winddirection, setWind] = useState(null);
  const [windspeed, setWindSpeed] = useState(null);
  const [minTemp, setMinTemp] = useState(null);
  const [maxTemp, setMaxTemp] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);

  const date = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const handleChange = (e) => {
    setLocation(e.target.value);
  };
  const api_key = "21588337bc906c68688e9dcaccbd4cfe";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}`;

  // weather icons
  const getWeatherIcon = (weatherCode) => {
    const iconMap = {
      "01d": "day-clear.gif",
      "01n": "night-clear.gif", // Clear sky
      "02d": "cloudy-day.gif",
      "02n": "cloudy-night.gif",
      "03d": "cloudy-day.gif",
      "03n": "cloudy-night.gif",
      "04d": "cloudy-day.gif",
      "04n": "cloudy-night.gif", // clouds
      "09d": "rain-day.gif",
      "09n": "rain-night.gif",
      "10d": "rain-day.gif",
      "10n": "rain-night.gif", // Rain
      "11d": "thunder.gif",
      "11n": "thunder.gif", // Thunderstorm
      "13d": "snow.gif",
      "13n": "snow.gif", // Snow
      "50d": "haze-day.gif",
      "50n": "haze-night.gif", // Mist/Fog/Haze
    };
    return iconMap[weatherCode] || "default.gif"; // Default icon if code is not found
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(url);
      console.log(response);

      setStatus(response.data.weather[0].main);
      setTemperature((response.data.main.temp - 273.5).toFixed(0) + "°");
      setMinTemp((response.data.main.temp_min - 273.5).toFixed(0) + "°");
      setMaxTemp((response.data.main.temp_max - 273.5).toFixed(0) + "°");
      setFeeling((response.data.main.feels_like - 273.5).toFixed(0) + "°");
      setHumid(response.data.main.humidity + "%");
      setPressure(response.data.main.pressure + "mbar");
      setWind(response.data.wind.deg + "°");
      setWindSpeed(response.data.wind.speed + "km/h");

      const weatherCode = response.data.weather[0].icon;
      setWeatherIcon(getWeatherIcon(weatherCode));
    } catch (error) {
      console.log("Error fetching weather data:", error);
      setStatus();
      setTemperature();
      setMinTemp();
      setMaxTemp();
      setFeeling();
      setHumid();
      setPressure();
      setWind();
      setWindSpeed();
      const weatherCode = "error";
      setWeatherIcon(getWeatherIcon(weatherCode));
      alert("oops : somethig went wrong, check search box");
    }
  };

  return (
    <div className="main bg-white p-2 rounded-lg relative font-mono shadow-2xl flex flex-col justify-center items-center">
      <div className="main-container flex p-5 w-full justify-between items-center border-2 border-t-0 border-r-0 border-l-0">
        {/* datetime */}
        <h3 className="text-center font-bold capitalize">{location}</h3>
        {/* datetime end */}
        <div className="flex justify-center items-center">
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              placeholder="search location"
              className="border-2 border-gray-200 h-10 p-3 rounded-l-lg focus:bg-gray-200 transition-all duration-300"
              value={location}
              onChange={handleChange}
            />
            <button className="bg-black text-white rounded-r-lg h-10 p-3 flex justify-center items-center clicked">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-search"
              >
                <circle cx="11" cy="10" r="8"></circle>
                <line x1="21" y1="22" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
        </div>
      </div>
      <div className=" items-center justify-center sm:flex">
        <div className="left flex gap-7 flex-col justify-center items-center p-4 text-center border-r-2 m-3">
          <h2 className="text-6xl flex justify-center pl-4">{temperature}</h2>
          <div className="flex justify-center flex-col">
            {weatherIcon && (
              <img
                src={`/weather_icons/${weatherIcon}`}
                alt="weather icon"
                width="80px"
              />
            )}
          </div>

          <p className="text-gray-600 text-2xl capitalize">{status}</p>
          <h1 className="flex justify-center items-center gap-2 ">
            <i className="ri-calendar-2-fill"></i>
            {day} {month} {year}
          </h1>
        </div>
        {/* right */}
        <div className="right p-3">
          <h2 className="right-row-1 flex  justify-center items-center mt-5 gap-5 text-center">
            <span className="flex flex-col-reverse justify-center w-full shadow-xl p-3 bg-gray-200 text-black rounded-xl">
              <span className="flex w-full justify-center items-center">
                <i className="ri-arrow-down-line font-bold text-blue-500"></i>{" "}
                min temp
              </span>
              <label htmlFor="" className="text-2xl">
                {minTemp}
              </label>
            </span>
            <span className="flex flex-col-reverse justify-center w-full shadow-xl p-3 bg-gray-200 text-black rounded-xl">
              <span className="flex w-full justify-center items-center">
                <i className="ri-arrow-up-line font-bold text-red-500"></i>
                max temp
              </span>
              <label htmlFor="" className="text-2xl">
                {maxTemp}
              </label>
            </span>
          </h2>
          <div className="right-row-2 flex justify-center items-center mt-5 gap-5 text-center ">
            <h6 className="flex flex-col-reverse justify-center w-full shadow-xl p-3 bg-gray-200 text-black rounded-xl">
              <span className="flex w-full justify-center items-center">
                <i className="ri-user-smile-line text-yellow-500"></i>
                Feels Like
              </span>
              <label htmlFor="" className="text-2xl">
                {feeling}
              </label>
            </h6>
            <h6 className="flex flex-col-reverse justify-center w-full shadow-xl p-3 bg-gray-200 text-black rounded-xl">
              <span className="flex w-full justify-center items-center">
                <i className="ri-contrast-drop-line text-blue-600"></i>
                Humidity
              </span>
              <label htmlFor="" className="text-2xl">
                {humid}
              </label>
            </h6>
          </div>
          <div className="right-row-3 flex justify-center items-center mt-5 gap-5 text-center ">
            <h6 className="flex flex-col-reverse justify-center w-full shadow-xl p-3 bg-gray-200 text-black rounded-xl">
              <span className="flex w-full justify-center items-center">
                <i class="ri-dashboard-2-fill text-gray-400"></i>
                Pressure
              </span>
              <label htmlFor="" className="text-xl">
                {press}
              </label>
            </h6>
            <h6 className="flex flex-col-reverse justify-center w-full shadow-xl p-3 bg-gray-200 text-black rounded-xl">
              <span className="flex w-full justify-center items-center">
                <i class="ri-compass-3-line text-cyan-600"></i>
                Direction
              </span>
              <label htmlFor="" className="text-xl">
                {winddirection}
              </label>
            </h6>
            <h6 className="flex flex-col-reverse justify-center w-full shadow-xl p-3 bg-gray-200 text-black rounded-xl">
              <span className="flex w-full justify-center items-center">
                <i class="ri-windy-fill text-green-600"></i>
                Speed
              </span>
              <label className="text-xl">{windspeed}</label>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
