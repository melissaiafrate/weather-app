function showTemperature(response) {
  let todayTempNumber = document.querySelector("#today-temp-number");
  let forecastCity = document.querySelector("#current-city-forecast");
  let description = document.querySelector("#weather-description");
  let currentHumidity = document.querySelector("#humidity");
  let currentWindSpeed = document.querySelector("#wind-speed");
  todayTempNumber.innerHTML = Math.round(response.data.main.temp);
  forecastCity.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].main;
  currentHumidity.innerHTML = response.data.main.humidity;
  currentWindSpeed.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "e4386934c81dcc4d977985af91d7aadd";
let city = "Ocho Rios";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
