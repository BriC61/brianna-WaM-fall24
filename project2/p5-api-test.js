





// function setup () {
//   loadJSON("http://api.openweathermap.org/geo/1.0/zip?zip=02903&appid=4ba86f24a3306f549b4a928c42926ccb", gotData, 'jsonp'); 
//   loadJSON("https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
//     &appid=4ba86f24a3306f549b4a928c42926ccb", gotData, 'jsonp'); 

// }
// function gotData(data){
//   zipData = data;
// }
// function draw() {
//   if (zipData) {
//     console.log(zipData.lat);
//     console.log(zipData.lon);

//   }
// }
var input;
var button;

var zipData;
var zipApi = "http://api.openweathermap.org/geo/1.0/zip?zip=";
var apiKey= "&appid=4ba86f24a3306f549b4a928c42926ccb";
// var lat;
// var lon;


function setup (){

    createCanvas(600,600);
    // input = createInput('zip');
    // button = createButton('submit');
    var button = select("#submit");
    button.mousePressed(getNewZip);

    input = select("#zip");
}

function gotZipData(data){
    zipData = data;
}

function getNewZip(){
    var zipUrl = zipApi + input.value() + apiKey;
    loadJSON(zipUrl, gotZipData);
    console.log(zipData);
}

var weatherData;
var weatherApi= "https://api.openweathermap.org/data/2.5/weather?";

function gotWeatherData(data){
    weatherData = data;
}

function getNewWeather(){
    var weatherUrl = weatherApi + "lat=" + zipData.lat + "& lon=" + zipData.lon + apiKey + "&units=imperial&lang=en";
    loadJSON(weatherUrl, gotWeatherData);
    console.log(weatherData);
}




