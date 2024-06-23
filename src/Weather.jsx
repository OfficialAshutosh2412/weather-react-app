import React, { useState } from "react";
import cloudy from "./assets/images/cloudy-day-3.svg";

const Weather = () => {
  const [city, setCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState();
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

  const url = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=${api_key}`;

  return (
    <div className="w-80 bg-white rounded-lg  relative font-mono shadow-2xl   p-6 flex flex-col justify-center items-center">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-xl bg-black rounded text-white p-5">
          {day} {month} {year}
        </h1>
        <p className="text-gray-600 text-2xl capitalize">sunny</p>
      </div>
      <img src={cloudy} alt="" className="w-44 absolute -top-24 -right-10" />
      <h2 className="text-6xl  mt-5 p-5">{weather}&deg;</h2>
      <h3 className="text-3xl text-center mb-3">{city}</h3>
      <form>
        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder="search location"
            className="border-2 border-gray-200 h-10 p-3 rounded-l-lg focus:bg-gray-200 transition-all duration-300 "
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
        </div>
      </form>
    </div>
  );
};

export default Weather;
