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
let zipApi = "https://api.openweathermap.org/geo/1.0/zip?zip=";
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
let currLocation;

let sunrise;
let sunset;

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
      document.getElementById("tallFlower").style.backgroundImage= "url(\"./assets/illustrations/flower5.svg\")"

      zipApiUrl = zipApi + zipInput + keyApi;
      getLocationData();

    } else{
      alert("Please enter a zip code");
    }
  }
});

// TESTING CONNECTION
// zipApiUrl = "https://api.openweathermap.org/geo/1.0/zip?zip=02903&appid=4ba86f24a3306f549b4a928c42926ccb"
// console.log(zipApiUrl);
// getLocationData();

//GET LON/LAT
function getLocationData() {
    fetch(zipApiUrl)
      .then(response => response.json())
      .then(data => {
        lat = data.lat;
        lon = data.lon;
        currLocation = data.name;
        // console.log (currLocation);

        getSunData(lat,lon); //Fetch sunrise/sunset data using obtained lat/lon
        getWeatherData(lat, lon); // Fetch weather data using the obtained lat/lon
      })
      .catch(error => {
        console.error('Error fetching location data:', error);
      });
}

//GET SUNRISE/SUNSET
function getSunData(lat,lon){
  let sunApi = "https://api.sunrisesunset.io/json?lat=" + lat + "&lng=" + lon;
  console.log (sunApi);
  fetch(sunApi)
    .then(response => response.json())
    .then(data => {
      apiSunrise = data.results.sunrise;
      apiSunset = data.results.sunset;

      let t = new Date();
      let time = t.toLocaleTimeString('en-US',{hour12: true});

      function parseTime(apiTime){
        let [timeWithoutSeconds, period] = apiTime.split(" "); // Split into "hh:mm:ss" and "AM/PM"
        let [hours, minutes] = timeWithoutSeconds.split(":");  // Split "hh:mm:ss" into "hh" and "mm"
        if (period === "PM" && hours !== 12) {
          hours = Number(hours) + 12;
        } else if (period === "AM" && hours === 12) {
          hours = 0;
        }
        // return {hours, minutes, period}; // Return time in "hh:mm AM/PM" format
        // console.log("hours: " + hours + " minutes: " + minutes);
        return formattedTime = (Number(hours) * 60) + Number(minutes);
      }
      sunrise = parseTime(apiSunrise);
      sunset = parseTime(apiSunset);
      currTime = parseTime(time);

      // console.log(sunrise);
      // console.log(sunset);
      // console.log(currTime);
      nightShift();
  })
  .catch(error => {
    console.error('Error fetching sunrise data:', error);
  });
}

// NIGHT SHIFT - SUNSET/SUNRISE API CONNECTION
// API CONNECTION WORKS, CANNOT FIGURE OUT HOW TO EDIT SINGLE BACKGROUND IMAGE
function nightShift(){
  // currTime = (12*60);
  if (currTime >= sunset || currTime < sunrise){
    document.body.style.background = 'linear-gradient(to bottom, rgb(27,42,94) 12%, rgb(56,87,196) 33%, rgb(56,87,196) 67%, rgb(17,34,94) 100%)';
    document.getElementById("header").style.filter = "invert(100%)"
    console.log(document.getElementById("header").style.color);
    // console.log ("it's past sunset");
  }
  else {
    document.body.style.background = 'linear-gradient(to bottom, rgb(198,215,240) 12%, rgb(56,87,196) 33%, rgb(56,87,196) 67%, rgb(17,34,94) 100%)';

    // console.log ("it's past sunrise");
  }
}

//GET WEATHER API
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
      currCondition = data.weather[0].main;
      // console.log ({currTemp, currHumidity, currWindSpeed, currCondition});
      
      printData();
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

//PRINT WEATHER DATA + FLOWER FUNCTIONS
function printData(){
  document.getElementById("header").style.display="inline-flex";
  document.getElementById("flwrContainer").style.display="flex";

  document.getElementById("currLocation").innerHTML= currLocation.toLowerCase();
  document.getElementById("currTemp").innerHTML = currTemp + "°f";
  document.getElementById("currHumidity").innerHTML = currHumidity +"%";
  document.getElementById("currWindSpeed").innerHTML = currWindSpeed + "mph";
  // document.getElementById("currCondition").innerHTML = currCondition;
  
  // console.log ({currTemp, currHumidity, currWindSpeed, currCondition});

  const flower1 = document.getElementById("flower1");
  const flower2 = document.getElementById("flower2");
  const flower3 = document.getElementById("flower3");
  const flower4 = document.getElementById("flower4");

  tempScaleWindAngle(); //swap out images (bud -> full bloom) based on temp
               //wiggling gif when moused over?
  humFrequency(); //more flowers when humid
  condIcon();
}

//HEIGHT FLOWER BASED ON TEMP + ROTATE FLOWER BASED ON WIND
function tempScaleWindAngle(){
  // shape of flower as variable? - swap images (more/less petals) based on one factor 
  flower1.style.transform = "translate(2vw," + (100-(currTemp+(Math.random()*10)))+ "%) rotate(-" + (currWindSpeed) + "deg)";
  flower2.style.transform = "translate(6vw," + (100-(currTemp+(Math.random()*20)))+ "%) rotate(-" + (currWindSpeed) + "deg)";
  flower3.style.transform = "translate(11vw," + (100-(currTemp+(Math.random()*40)))+ "%) rotate(-" + (currWindSpeed) + "deg)";
  flower4.style.transform = "translate(6vw," + (100-currTemp) + "%) rotate(-" + (currWindSpeed) + "deg)";
}

//FREQUENCY OF FLOWERS BASED ON HUMIDITY
function humFrequency (){
  var freq = Math.floor((currHumidity/20));
  console.log(freq);

  for(let i = 1; i <= freq; i++){
    console.log(document.getElementById(`flower${i}`));
    document.getElementById(`flower${i}`).style.display = "block"
  }
}


//SWAP OUT HEADER ICONS BASED ON CONDITION
function condIcon() {
  // console.log ("current condition" + currCondition);
  const conditionIcon = document.getElementById("conditionIcon")
  const weather = document.getElementById("weatherGIF");
  // currCondition = "Clouds"

  if (currCondition == "Clear"){
    conditionIcon.setAttribute ("src", "./assets/icons/sun.svg")
  }
  else if (currCondition == "Clouds" ||
           currCondition == "Mist" || 
           currCondition == "Smoke" || 
           currCondition == "Haze" ||
           currCondition == "Dust"|| 
           currCondition == "Fog"){
    conditionIcon.setAttribute("src", "./assets/icons/cloudy.svg");
    weather.style.background = "url('./assets/illustrations/cloudy.gif')";
    weather.style.backgroundSize = "cover";
    // weather.style.opacity= "50%";
  }
  else if (currCondition == "Thunderstorm"){
    conditionIcon.setAttribute("src", "./assets/icons/lightning.svg")
  }
  else if (currCondition == "Drizzle" || currCondition == "Rain"){
    conditionIcon.setAttribute("src", "./assets/icons/rain.svg");
    weather.style.background = "url('./assets/illustrations/rain.gif')";
  }
  else if (currCondition == "Snow"){
    conditionIcon.setAttribute("src", "./assets/icons/snow.svg")
    weather.style.background = "url('./assets/illustrations/snow.gif')";
  }
  else{
    conditionIcon.style.display = "none";
  }
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
  // days = days + 86400000;
  // console.log(d);
  // console.log(t);
  // console.log(days);
  var i = days % countryList.length;
  // console.log(i);

  document.getElementById("country").innerHTML = countryList[i];
  document.getElementById("meaning").innerHTML = meaningList[i];
  document.getElementById("addInfo").innerHTML = addInfoList[i];
}

window.addEventListener("DOMContentLoaded",() => {
  dailyMeaning();
});

