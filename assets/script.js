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
var forecast = document.querySelector("#forecast");

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

  //data with a list of 40 values,
  //each of those is in 3 hour intervals
  //

  for (let i = 0; i < data.list.length; i += 8) {
    var name = data.city.name;
    var localTime = data.list[i].dt_txt;
    var conditions = data.list[i].weather[0].main;
    var condIcon = data.list[i].weather[0].icon;
    var temp = data.list[i].main.temp;
    var humidity = data.list[i].main.humidity;
    var wind = data.list[i].wind.speed;

    var currentWeather = {
      name,
      localTime,
      conditions,
      condIcon,
      temp,
      humidity,
      wind,
    };
    makeForecastCard(currentWeather);
  }
}

function makeForecastCard(data) {
  //select the parent container where everything will go and append to it
  console.log("this is to display weather");
  console.log(data);

  var node1 = document.createElement("li");
  node1.textContent = [
    data.name +
      data.localTime +
      data.conditions +
      data.temp +
      data.humidity +
      data.wind,
  ];
  console.log(data.name);
  forecast.appendChild(node1);
}

//used activity 23 for example
//var displayWeather = function (city, searchTerm) {};
//submitButton.addEventListener("click", getGeoloc);
fetchButton.addEventListener("click", getGeoloc);
