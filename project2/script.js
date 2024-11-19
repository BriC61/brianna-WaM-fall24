// RESET PAGE
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

// SET DATE AND TIME
window.addEventListener("DOMContentLoaded",() => {
  const time = document.getElementById("currTime");
  const date = document.getElementById("date");

  function printDate() {
    let d = new Date();
    const dateOptions= {
      month:"2-digit",
      day:"2-digit",
      year:"numeric"
    }
    date.innerHTML = d.toLocaleDateString('en-US',dateOptions);
  }

  setInterval(() =>{
    let t = new Date();
    const timeOptions = {
      hour:"2-digit",
      minute:"2-digit",
      second:"2-digit"
    }
    time.innerHTML = t.toLocaleTimeString('en-US',timeOptions).toLowerCase();
  }, 1000);

  printDate();
});

// WEATHER API CONNECTION
let zipApi = "http://api.openweathermap.org/geo/1.0/zip?zip=";
let keyApi = "&appid=4ba86f24a3306f549b4a928c42926ccb";
let zipApiUrl;
let lat;
let lon;

let weatherApi = "https://api.openweathermap.org/data/2.5/weather?"
let weatherApiUrl;

var currTemp;
var currHumidity;
var currWindSpeed;
var currCondition;
var currLocation;

window.addEventListener("DOMContentLoaded", () => {
// USER INPUT
const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", getNewZip)
function getNewZip(){
  
  const zipInput = document.getElementById("zip").value;
  // console.log(zipInput);

  if(zipInput){
    document.body.style.overflowY="scroll";
    document.getElementById("zipForm").style.display="none";
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
        currLocation = data.name;
        console.log (currLocation);

        getWeatherData(lat, lon); // Fetch weather data using the obtained lat/lon
      })
      .catch(error => {
        console.error('Error fetching location data:', error);
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
      currTemp = Math.round(data.main.temp);
      currHumidity = data.main.humidity;
      currWindSpeed = data.wind.speed;
      currCondition = data.weather[0].description;
      // console.log ({currTemp, currHumidity, currWindSpeed, currCondition});
      
      printData();
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}



function printData(){
  document.getElementById("header").style.display="inline-flex";
  document.getElementById("flower4").style.display="block";
  // console.log ({currTemp, currHumidity, currWindSpeed, currCondition});
  // console.log({displayTemp, displayHumidity, displayWindSpeed, displayCondition});
  document.getElementById("currLocation").innerHTML= currLocation.toLowerCase();
  document.getElementById("currTemp").innerHTML = currTemp + "°f";
  document.getElementById("currHumidity").innerHTML = currHumidity +"%";
  document.getElementById("currWindSpeed").innerHTML = currWindSpeed + "mph";
  // document.getElementById("currCondition").innerHTML = currCondition;
}

// FLOWER MEANING SCRIPT
var countryList = new Array(
  "china", 
  "europe", 
  "japan", 
  "australia", 
  "united states", 
  "buddhism", 
  "iran"
);

var meaningList = new Array(
  "longevity • fortune • nobility",
  "death • mourning",
  "imperial power • longevity • autumn",
  "motherhood",
  "happiness • friendship",
  "yang energy",
  "worship of anishi vanghuhi"
);

var addInfoList = new Array(
  "given during baby showers and birthday celebrations",
  "given during funerals and memorials; placed on graves on Day of the Dead",
  "used in imperial regalia",
  "nicknamed “mums,” given for mother\'s day celebration",
  "linked with arrival of autumn",
  "associated with masculine, active, positive power",
  "a female spiritual being who presides over good blessings and rewards"
);

function dailyMeaning() {
  var d = new Date();
  var t = d.getTime();

  var days = Math.floor(t/86400000);
  console.log(d);
  console.log(t);
  console.log(days);
  var i = days % countryList.length;
  console.log(i);

  document.getElementById("country").innerHTML = countryList[i];
  document.getElementById("meaning").innerHTML = meaningList[i];
  document.getElementById("addInfo").innerHTML = addInfoList[i];
}

window.addEventListener("DOMContentLoaded",() => {
  dailyMeaning();
  tempFlowerFrequency();
});

console.log(currTemp);
console.log(currLocation);

function tempFlowerFrequency (){
  // var freq = (currTemp.value-50)/5;
  console.log(currTemp);
  console.log(freq);
}