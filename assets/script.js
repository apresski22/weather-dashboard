//weather dashboard with form inputs for multiple cities
var fetchButton = document.getElementById("fetch-button");
//var submitButton = document.getElementById("#btn");
var cityInputEl = document.querySelector("cityname");
//list of cities, a search option, five-day forecast
//city saved to search history
//current and future weather for that city
// city name (city: {name}), date, icon respresentation of weather conditions , temp (list:main:temp), humidity (list[i].main:humidity)), wind speed (list[i].wind:{speed})
//
//search history, click on a city to be presented with current and future conditions
var cityList = document.querySelector("ul");

function getGeoloc() {
  console.log("hello getgeoloc");
  var requestUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=San Diego,CA,US&appid=f4e7f30e206822fc632d60d1295a44e8";
  fetch(requestUrl)
    .then(function (response) {
      // console.log("This is my response to getgeoloc");
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      // console.log("This is my data to getgeoloc");
      // console.log(data);
      var lat = data[0].lat;
      var lon = data[0].lon;
      getWeather(lat, lon);
    });
}

function getWeather(lat, lon) {
  console.log("getweather");
  //var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=f4e7f30e206822fc632d60d1295a44e8";
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=f4e7f30e206822fc632d60d1295a44e8";
  fetch(requestUrl)
    .then(function (response) {
      console.log("This is my response to getWather");
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log("This is my data to getWeather");
      analyzeForecastData(data);
    });
}

function analyzeForecastData(data) {
  console.log("ANALYZING CURRECT FORECAST DATA");
  console.log(data);
  console.log(data.city.name);
  console.log(data.list[0].dt_txt);
  console.log(data.list[0].weather[0].main);
  console.log(data.list[0].weather[0].icon);
  console.log(data.list[0].main.temp);
  console.log(data.list[0].main.humidity);
  console.log(data.list[0].wind.speed);

  var name = data.city.name;
  var localTime = data.list[0].dt_txt;
  var conditions = data.list[0].weather[0].main;
  var condIcon = data.list[0].weather[0].icon;
  var temp = data.list[0].main.temp;
  var humidity = data.list[0].main.humidity;
  var wind = data.list[0].wind.speed;

  var currentWeather = [
    name,
    localTime,
    conditions,
    condIcon,
    temp,
    humidity,
    wind,
  ];
}

//used activity 23 for example
//var displayWeather = function (city, searchTerm) {};
//submitButton.addEventListener("click", getGeoloc);
fetchButton.addEventListener("click", getGeoloc);
