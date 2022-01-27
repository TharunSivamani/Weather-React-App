import React, { useState } from "react";

const api = {
  key: "fe4feefa8543e06d4f3c66d92c61b69c",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          // console.log(result);
        }); //returns the data of the city
    }
  };

  const dateBuild = (d) => {
    let months = [
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
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  let emoji = null;

  if (typeof weather.main != "undefined") {
    if (weather.weather[0].main === "Clouds") {
      emoji = "cloudy";
    } else if (weather.weather[0].main === "Rain") {
      emoji = "rain";
    } else if (weather.weather[0].main === "Thunderstorm") {
      emoji = "storm";
    } else if (weather.weather[0].main === "Snow") {
      emoji = "snow";
    } else if (weather.weather[0].main === "Clear") {
      emoji = "perfect-day";
    } else if (weather.weather[0].main === "Fog") {
      emoji = "fog";
    } else if (weather.weather[0].main === "Wind") {
      emoji = "wind";
    } else if (weather.weather[0].main === "Mist") {
      emoji = "mist";
    } else {
      emoji = null;
    }
  }

  return (
    <div className="border_box">
      <div className="container-main">
        <div
          className={
            typeof weather.main != "undefined"
              ? weather.main.temp > 16
                ? "app warm"
                : "app"
              : "app-org"
          }
        >
          <main>
            <div className="search-box">
              <input
                type="text"
                className="search-bar"
                placeholder="Search ..."
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
              />

              {typeof weather.main != "undefined" ? (
                <div>
                  <div className="date-box">
                    <div className="date">{dateBuild(new Date())}</div>
                  </div>
                  <div className="location-box">
                    <div className="location">
                      {weather.name} | {weather.sys.country}
                    </div>
                  </div>

                  <div className="weather-box">
                    <div className="temp">
                      {Math.round(weather.main.temp)} ° C
                    </div>
                    <div className="weather">{weather.weather[0].main}</div>

                    <img src={`./icons/${emoji}.svg`} alt={emoji}></img>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
