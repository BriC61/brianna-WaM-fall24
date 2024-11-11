let zipApi = "http://api.openweathermap.org/geo/1.0/zip?zip=";
let keyApi = "&appid=4ba86f24a3306f549b4a928c42926ccb";
let zipApiUrl;
let lat;
let lon;

let weatherApi = "https://api.openweathermap.org/data/2.5/weather?"
let weatherApiUrl;

let currTemp;
let currHumidity;
let currWindSpeed;
let currCondition;

window.addEventListener("DOMContentLoaded", () => {
// USER INPUT
const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", getNewZip)
function getNewZip(){
  const zipInput = document.getElementById("zip").value;
  // console.log(zipInput);

  if(zipInput){
    zipApiUrl = zipApi + zipInput + keyApi;
    // console.log(zipApiUrl);

    getLocationData();
  } else{
    alert("Please enter a zip code");
  }
}
});

// TESTING CONNECTION
// zipApiUrl = "http://api.openweathermap.org/geo/1.0/zip?zip=02903&appid=4ba86f24a3306f549b4a928c42926ccb"
// console.log(zipApiUrl);
// getLocationData();


function getLocationData() {
    fetch(zipApiUrl)
      .then(response => response.json())
      .then(data => {
        lat = data.lat;
        lon = data.lon;
        // console.log ({lat, lon});

        getWeatherData(lat, lon); // Fetch weather data using the obtained lat/lon
      })
      .catch(error => {
        console.error('Error fetching location data:', error);
        document.getElementById('description').textContent = 'Failed to load location data.';
      });
}

function getWeatherData(lat, lon){
  // console.log(lat);
  // console.log(lon);
  weatherApiUrl = weatherApi + "lat=" + lat + "&lon=" + lon + keyApi + "&units=imperial&lang=en";
  console.log(weatherApiUrl);
  fetch(weatherApiUrl)
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      currTemp = data.main.temp;
      currHumidity = data.main.humidity;
      currWindSpeed = data.wind.speed;
      currCondition = data.weather[0].description;
      // console.log ({currTemp, currHumidity, currWindSpeed, currCondition});
      
      printData();
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      document.getElementById('description').textContent = 'Failed to load weather data.';
    });
}

function printData(){
  // console.log ({currTemp, currHumidity, currWindSpeed, currCondition});
  // console.log({displayTemp, displayHumidity, displayWindSpeed, displayCondition});
  
  document.getElementById("currTemp").innerHTML = "Temp: " + currTemp + "°f";
  document.getElementById("currHumidity").innerHTML = "Humidity: " + currHumidity +"%";
  document.getElementById("currWindSpeed").innerHTML = "Wind Speed: " + currWindSpeed + "mph";
  document.getElementById("currCondition").innerHTML = "Conditions: " + currCondition;

}


