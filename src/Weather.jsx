import React, { useEffect, useState } from "react";
import cloudy from "./assets/images/weather_icons/cloudy-day-3.svg";
import axios from "axios";

const Weather = () => {
  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState();
  const [status, setStatus] = useState("null");
  const [feeling, setFeeling] = useState(null);
  const [humid, setHumid] = useState(null);
  const [press, setPressure] = useState(null);
  const [winddirection, setWind] = useState(null);
  const [windspeed, setWindSpeed] = useState(null);
  const [minTemp, setMinTemp] = useState(null);
  const [maxTemp, setMaxTemp] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios
      .get(url)
      .then((res) => {
        console.log(res);
        setStatus(res.data.weather[0].main);
        setTemperature((res.data.main.temp - 273.5).toFixed(0));
        setMinTemp((res.data.main.temp_min - 273.5).toFixed(0));
        setMaxTemp((res.data.main.temp_max - 273.5).toFixed(0));
        setFeeling((res.data.main.feels_like - 273.5).toFixed(0));
        setHumid(`${res.data.main.humidity}%`);
        setPressure(`${res.data.main.pressure}mbar`);
        setWind(`${res.data.wind.deg}`);
        setWindSpeed(`${res.data.wind.speed}`);
      })
      .catch(() => {
        console.log("error hai bhai");
      });
  };

  return (
    <div className=" bg-white p-2 rounded-lg  relative font-mono shadow-2xl flex flex-col justify-center items-center">
      <div className="flex p-5 w-full justify-between items-center border-2 border-t-0 border-r-0 border-l-0">
        <h1 className="flex justify-center items-center gap-2 ">
          <i class="ri-calendar-2-fill"></i>
          {day} {month} {year}
          <h3 className=" text-center font-bold capitalize">{location}</h3>
        </h1>
        <div className="flex justify-center items-center">
          <form onSubmit={handleSubmit} className="flex">
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
          </form>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="left flex flex-col-reverse justify-center items-center p-4 text-center border-r-2 m-3">
          <div className="">
            <img src={cloudy} alt="" className=" " />
            <p className="text-gray-600 text-2xl capitalize">{status}</p>
          </div>
          <h2 className="text-6xl flex ">{temperature}&deg;</h2>
        </div>
        <div className="right p-3">
          <h2 className="text-xl flex justify-center items-center mt-5 gap-5 text-center">
            <span className="flex justify-center w-full shadow-xl p-3 bg-gray-500 text-white rounded-xl">
              <i className="ri-arrow-down-line font-bold"></i> min temp :{" "}
              {minTemp}&deg;
            </span>
            <span className="flex justify-center w-full shadow-xl p-3 bg-gray-500 text-white rounded-xl">
              <i className="ri-arrow-up-line font-bold"></i>
              max temp : {maxTemp}&deg;
            </span>
          </h2>
          <div className=" flex justify-center items-center mt-5 gap-5 text-center ">
            <h6 className="flex justify-center w-full shadow-xl p-3 bg-gray-500 text-white rounded-xl">
              <i className="ri-user-smile-line"></i>
              Feels Like : {feeling}&deg;
            </h6>
            <h6 className="flex justify-center w-full shadow-xl p-3 bg-gray-500 text-white rounded-xl">
              <i className="ri-contrast-drop-line"></i>
              Humidity : {humid}
            </h6>
          </div>
          <div className=" flex justify-center items-center mt-5 gap-5 text-center ">
            <h6 className="flex justify-center w-full shadow-xl p-3 bg-gray-500 text-white rounded-xl">
              <i class="ri-dashboard-2-fill"></i>
              Pressure : {press}
            </h6>
            <h6 className="flex justify-center w-full shadow-xl p-3 bg-gray-500 text-white rounded-xl">
              <i class="ri-compass-3-line"></i>
              Wind Direction {winddirection}&deg;
            </h6>
            <h6 className="flex justify-center w-full shadow-xl p-3 bg-gray-500 text-white rounded-xl">
              <i class="ri-windy-fill"></i>
              Wind Speed {windspeed}km/h
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
