//weather dashboard with form inputs for multiple cities
//list of cities, a search option, five-day forecast
//city saved to search history
//current and future weather for that city
// city name, date, icon respresentation of weather conditions, temp, humidity, wind speed
//search history, click on a city to be presented with current and future conditions
var cityList = document.querySelector("ul");
var fetchButton = document.getElementById("fetch-button");

function getApi() {
  var requestUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=San Diego,CA,US&limit=5&appid=f4e7f30e206822fc632d60d1295a44e8";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

fetchButton.addEventListener("click", getApi);
