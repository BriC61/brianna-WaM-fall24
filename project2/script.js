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
      sunrise = data.results.sunrise;
      sunset = data.results.sunset;

      console.log(sunrise);
      console.log(sunset);

      // nightShift();
  })
  .catch(error => {
    console.error('Error fetching sunrise data:', error);
  });
}

//NIGHT SHIFT - SUNSET/SUNRISE API CONNECTION
//API CONNECTION WORKS, CANNOT FIGURE OUT HOW TO EDIT SINGLE BACKGROUND IMAGE
// function nightShift(){
//   let t = new Date();
//   let formattedTime = t.toLocaleTimeString('en-US',{ hour12: true });
//   formattedTime = "7:29:09 AM"
//   console.log(formattedTime);
  
  
//   if (formattedTime >= sunrise){
//     document.body.style.backgroundImage = "linear-gradient(0deg, rgba(200,200,200,1) 0%, rgba(56,87,196,1) 33%, rgba(56,87,196,1) 50%, rgba(56,87,196,1) 67%, rgba(198,215,240,1) 88%);"
//     console.log(document.body.style);
//   }
//   else if (formattedTime >= sunset){
//     console.log ("it's past sunset");
//   }
// }

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

  const flowerHead1 = document.getElementById("flowerHead1");
  const flowerHead2 = document.getElementById("flowerHead2");
  const flowerHead3 = document.getElementById("flowerHead3");
  const flowerHead4 = document.getElementById("flowerHead4");

  tempScale(); //swap out images (bud -> full bloom) based on temp
               //wiggling gif when moused over?
  // humFlowerFrequency(); //more flowers when humid
  // windAngle(); //use translate(rotation) or shift+ left/right based on wind
                  //angle stem to follow
  condIcon();
}

//SCALE FLOWER BASED ON TEMP
function tempScale(){
  // shape of flower as variable? - swap images (more/less petals) based on one factor 

  flowerHead1.style.bottom=(currTemp + "%");
  flowerHead2.style.bottom=((currTemp-(Math.random()*40)) + "%");
  flowerHead3.style.bottom=((currTemp-(Math.random()*20)) + "%");
  flowerHead4.style.bottom=((currTemp-(Math.random()*10)) + "%");
  // flowerHead1.style.width=((currTemp/2) + "%");
  // flowerHead1.style.left=(Math.floor(Math.random()*(90-25))+50 + "%");
  // flowerHead1.style.top=(Math.floor(Math.random()*(50-15))+15 + "%");

  // document.getElementById("flowerHead2").style.width=((currTemp/2) + "%");
  // document.getElementById("flowerHead3").style.width=((currTemp/2) + "%");
  // document.getElementById("flowerHead5").style.width=((currTemp/2) + "%");
}

//FREQUENCY OF FLOWERS BASED ON HUMIDITY
function humFlowerFrequency (){
  var freq = Math.floor((currHumidity/20));
  console.log(freq);
  for(let i = 0; i < freq.length; i++){
    console.log(i);
    let showFlower = "document.getElementbyID"+ "flowerHead" + i
    console.log(showFlower);
    showFlower.style.display="flex";

  }
  // console.log(freq);
}



//SWAP OUT HEADER ICONS BASED ON CONDITION
function condIcon() {
  console.log ("current condition" + currCondition);

  const conditionIcon = document.getElementById("conditionIcon")
  if (currCondition == "Clear"){
    conditionIcon.setAttribute ("src", "./assets/icons/sun.svg")
  }
  else if (currCondition == "Clouds" ||
           currCondition == "Mist" || 
           currCondition == "Smoke" || 
           currCondition == "Haze" ||
           currCondition == "Dust"|| 
           currCondition == "Fog"){
    conditionIcon.setAttribute("src", "./assets/icons/cloudy.svg")
  }

  else if (currCondition == "Thunderstorm"){
    conditionIcon.setAttribute("src", "./assets/icons/lightning.svg")
  }
  else if (currCondition == "Drizzle" || currCondition == "Rain"){
    conditionIcon.setAttribute("src", "./assets/icons/rain.svg")
  }
  else if (currCondition == "Snow"){
    conditionIcon.setAttribute("src", "./assets/icons/snow.svg")
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

