
let locations = [
	{ name: "Lofoten", latitude: 67.911556, longitude: 13.022218 },
	{ name: "Heimdal", latitude: 63.358027, longitude: 10.361895 },
	{ name: "Heaven", latitude: 37.032673, longitude: -95.623558 },
	{ name: "Tokyo", latitude: 35.689487, longitude: 139.691711 },
	{ name: "Kyiv", latitude: 50.523851, longitude: 30.549735 },
	{ name: "Pyongyang", latitude: 38.976427, longitude: 125.707816 },
	{ name: "Isle of Man", latitude: 54.192357, longitude: -4.552920 }
];



// Fetch data 
function fetchWeatherData(latitude, longitude) {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          reject(new Error(`Error loading API: ${response.status}`));
        } else {
          return response.json();
        }
      })
      .then(data => {
        resolve(data.current_weather);
      })
      .catch(error => {
        reject(error);
      });
  });
}


function displayWeather(locationName, weatherData, index) {
  const weatherDiv = document.getElementById(`weather${index + 1}`);
  
  /* Try to add new div dynamically
  if (!weatherDiv) {
	weatherDiv = document.createElement('div');
	weatherDiv.id = `weather${index+1}`;
	document.getElementById('weather-section').appendChild(weatherDiv); 
  } */ 
  
  weatherDiv.innerHTML = ''; // Clear existing content in case run multiple times
  
  // Create elements for temperature and windspeed
  const heading = document.createElement('h3');
  heading.textContent = `${locationName}`;
  
  const temperature = document.createElement('p');
  temperature.textContent = `Temperature: ${weatherData.temperature} °C`;
  
  const windspeed = document.createElement('p');
  windspeed.textContent = `Windspeed: ${weatherData.windspeed} km/h`;
   
  // Append data to the respective weather div
  weatherDiv.appendChild(heading);
  weatherDiv.appendChild(temperature);
  weatherDiv.appendChild(windspeed);
}

async function loadWeatherForLocations() {
  for (let i = 0; i < locations.length; i++) {
    const location = locations[i];
    
    try {
      const weatherData = await fetchWeatherData(location.latitude, location.longitude);
      displayWeather(location.name, weatherData, i);
    } catch (error) {
      console.error(`Error fetching weather data for ${location.name}:`, error);
    }
  }
}

// Call the main function to load weather when the page is ready
document.addEventListener('DOMContentLoaded', loadWeatherForLocations);


