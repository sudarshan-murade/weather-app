// 1. ACCESSING HTML ELEMENTS
const button = document.getElementById("btn");
const cityInput= document.getElementById("cityInput");
const error = document.getElementById("error");
const weatherEmoji = document.getElementById("weatherEmoji");
const temperature = document.getElementById("temperature");
const city = document.getElementById("cityName");
const description = document.getElementById("description");
const humidity= document.getElementById("humidity");
const wind = document.getElementById("wind");


// 2. EVENT LISTENERS 

button.addEventListener("click", function () {
    getWeather();
});

cityInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});



// 3. MAIN FUNCTION

async function getWeather() {

    const cityName = cityInput.value;

    const apiKey = "7fa0314a55aef9a71c29f27b875383df";

    const Url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName +
        "&appid=" +
        apiKey +
        "&units=metric";

    try {
        const response = await fetch(Url);
        const data = await response.json();

        if (data.cod == "404") {
            error.innerHTML = "❌ City not found!";
            return;
        }

        const weatherMain = data.weather[0].main;

        let emoji = "🌡️";

        if (weatherMain === "Clear") {
            emoji = "☀️";
        } 
        else if (weatherMain === "Clouds") {
            emoji = "⛅";
        } 
        else if (weatherMain === "Rain") {
            emoji = "🌧️";
        } 
        else if (weatherMain === "Drizzle") {
            emoji = "🌦️";
        } 
        else if (weatherMain === "Thunderstorm") {
            emoji = "⛈️";
        } 
        else if (weatherMain === "Snow") {
            emoji = "❄️";
        } 
        else if (weatherMain === "Mist" || weatherMain === "Fog") {
            emoji = "🌫️";
        }

        // Clear error
        error.innerHTML = "";

        // UpdatING ELEMENT TEXT
        weatherEmoji.innerHTML = emoji;
        temperature.innerHTML = Math.round(data.main.temp) + "°C";
        city.innerHTML = data.name;
        description.innerHTML = data.weather[0].description;
        humidity.innerHTML = data.main.humidity + "%";
        wind.innerHTML = (data.wind.speed * 3.6).toFixed(1) + " km/h";

    } catch (err) {
        error.innerHTML = "⚠️ Something went wrong!";
    }
}