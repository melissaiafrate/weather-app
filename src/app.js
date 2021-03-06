function formatDate(datestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();
  let fullDate = `${day} ${month} ${date}, ${year}`;
  return fullDate;
}

function formatTime(timestamp) {
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let options = { timeZone: "EST", timeZoneName: "short" };
  let timeZone = now.toLocaleTimeString("en-US", options);
  hour = hour % 12;
  hour = hour ? hour : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let fullTime = `${timeZone}`;
  return fullTime;
}

function getForecast(coordinates) {
  let cityLon = coordinates.lon;
  let cityLat = coordinates.lat;
  let apiKey = "e4386934c81dcc4d977985af91d7aadd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  let todayTempNumber = document.querySelector("#today-temp-number");
  let forecastCity = document.querySelector("#current-city-forecast");
  let description = document.querySelector("#weather-description");
  let currentHumidity = document.querySelector("#humidity");
  let currentWindSpeed = document.querySelector("#wind-speed");
  let todayDate = document.querySelector("#today-date");
  let updatedTime = document.querySelector("#last-update-time");
  let weatherIcon = document.querySelector("#weather-icon");
  celsiusTemperature = response.data.main.temp;
  todayTempNumber.innerHTML = Math.round(response.data.main.temp);
  forecastCity.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  currentHumidity.innerHTML = response.data.main.humidity;
  currentWindSpeed.innerHTML = Math.round(response.data.wind.speed);
  todayDate.innerHTML = formatDate(response.data.dt * 1000);
  updatedTime.innerHTML = formatTime(response.data.dt * 1000);
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
  console.log(response);
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  console.log(response);
  let forecastArray = response.data.daily;

  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecastArray.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2 weather-forecast-days">
                <div class="weather-forecast-dates">
                  ${formatForecastDay(forecastDay.dt)}
                </div>
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png";
                alt="Weather Icon"
                width="36"
                class = "weather-forecast-icon">
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temp-max">${Math.round(
                    forecastDay.temp.max
                  )}??</span>
                  <span class="weather-forecast-temp-min">${Math.round(
                    forecastDay.temp.min
                  )}??</span>
                </div>
                </div>
              `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function search(city) {
  let apiKey = "e4386934c81dcc4d977985af91d7aadd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-text-input");
  search(cityInput.value);
}

function showPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e4386934c81dcc4d977985af91d7aadd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function showCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let now = new Date();

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showCurrentPosition);

let celsiusTemperature = null;

search("Toronto");
