let now = new Date();
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

function showTemperature(response) {
  let todayTempNumber = document.querySelector("#today-temp-number");
  let forecastCity = document.querySelector("#current-city-forecast");
  let description = document.querySelector("#weather-description");
  let currentHumidity = document.querySelector("#humidity");
  let currentWindSpeed = document.querySelector("#wind-speed");
  let todayDate = document.querySelector("#today-date");
  let updatedTime = document.querySelector("#last-update-time");
  todayTempNumber.innerHTML = Math.round(response.data.main.temp);
  forecastCity.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  currentHumidity.innerHTML = response.data.main.humidity;
  currentWindSpeed.innerHTML = Math.round(response.data.wind.speed);
  todayDate.innerHTML = formatDate(response.data.dt * 1000);
  updatedTime.innerHTML = formatTime(response.data.dt * 1000);
  console.log(response);
}

let apiKey = "e4386934c81dcc4d977985af91d7aadd";
let city = "Barcelona";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
