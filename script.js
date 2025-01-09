const apiKey = 'bad0f335b692d3ba2abc087b407a4e7c';

async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error("Unable to fetch weather data");
        }

        const data = await response.json();
        console.log(data);
        updateWeatherUI(data);
    } catch (error) {
        console.error(error);
    }
}

const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");
const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date");
const descriptionIcon = document.querySelector(".description i");

function updateWeatherUI(data) {
    cityElement.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    visibility.textContent = `${data.visibility / 1000} km`;
    descriptionText.textContent = data.weather[0].description;

    const currentDate = new Date();
    date.textContent = currentDate.toDateString();

    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;






    const recommendationText = document.querySelector('.recommendation-text');
    recommendationText.textContent = generateRecommendation(data);
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener('submit', function (e) {
    e.preventDefault();
    const city = inputElement.value.trim(); // Trim whitespace for cleaner input
    if (city !== '') {
        fetchWeatherData(city);
    }
    inputElement.value = '';
});

function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Mist: "cloud",
        Snow: "ac_unit",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };
    return iconMap[weatherCondition] || "help";
}






function generateRecommendation(data) {
    const temp = data.main.temp;
    const weather = data.weather[0].main;
    const windSpeed = data.wind.speed;

    let recommendation = "Enjoy your day!";

    if (weather === "Rain") {
        recommendation = "It's rainy. Carry an umbrella and wear waterproof shoes.";
    } else if (weather === "Snow") {
        recommendation = "It's snowing. Stay warm with heavy clothing and boots.";
    } else if (temp > 30) {
        recommendation = "It's hot outside. Wear light, breathable clothes and stay hydrated.";
    } else if (temp < 10) {
        recommendation = "It's cold. Dress warmly and consider a scarf and gloves.";
    } else if (windSpeed > 20) {
        recommendation = "It's windy. Avoid outdoor activities and secure loose items.";
    } else if (weather === "Clear") {
        recommendation = "The weather is clear. A perfect day for outdoor activities!";
    }

    return recommendation;
}
