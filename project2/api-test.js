
// fetch("http://api.openweathermap.org/geo/1.0/zip?zip=02903&appid=4ba86f24a3306f549b4a928c42926ccb")
//     .then(response => response.json())
//     .then(data => console.log(data));


let zipApi = "http://api.openweathermap.org/geo/1.0/zip?zip=02903&appid=4ba86f24a3306f549b4a928c42926ccb";

//connect to user input

function getLocationData() {
    fetch(zipApi)
      .then(response => response.json())
      .then(data => {
        const lat = data.lat;
        const lon = data.lon;
        // getWeatherData(lat, lon); // Fetch weather data using the obtained lat/lon
      })
      .catch(error => {
        console.error('Error fetching location data:', error);
        document.getElementById('description').textContent = 'Failed to load location data.';
      });
}

// Fetch weather data using latitude and longitude from the second API
// function getWeatherData(lat, lon) {
//     const weatherUrl = `${weatherApiUrl}&lat=${lat}&lon=${lon}`;

//     fetch(weatherUrl)
//       .then(response => response.json())
//       .then(data => {
//         // Display weather data in the HTML
//         document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
//         document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
//       })
//       .catch(error => {
//         console.error('Error fetching weather data:', error);
//         document.getElementById('description').textContent = 'Failed to load weather data.';
//       });
// }

getLocationData();