//WEATHER APP

const weatherForm = document.querySelector(".inputBox");
const cityInput = document.querySelector(".textBox");
const card = document.querySelector(".card");
const apiKey = "60a76a7a3beca3d73887d3e2bd28853f";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        card.textContent = "⏳ Loading...";
        card.style.display = "flex";

        try {
            const weatherData = await getWeather(city);
            DisplayWeatherInfo(weatherData);

        } catch (error) {
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("Please enter the city🤦");
    }
});

async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response = await fetch(apiUrl);
    if (!response) {
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
};

function DisplayWeatherInfo(data) {
    const {
        name: city,
        main: { temp, humidity },
        weather: [{ description, id }]
    } = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    cityDisplay.textContent = city;
    cityDisplay.classList.add("cityDisplay");

    const tempDisplay = document.createElement("p");
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)} °C`; // Convert from Kelvin
    tempDisplay.classList.add("tempDisplay");

    const humidityDisplay = document.createElement("p");
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.classList.add("humidityDisplay");

    const descritionDisplay = document.createElement("p");
    descritionDisplay.textContent = description;
    descritionDisplay.classList.add("descritionDisplay");

    const emojiDisplay = document.createElement("p");
    emojiDisplay.textContent = getWeatherEmoji(id);
    emojiDisplay.classList.add("emojiDisplay");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descritionDisplay);
    card.appendChild(emojiDisplay);
}


function getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) return "⛈️";
    if (weatherId >= 300 && weatherId < 400) return "🌦️";
    if (weatherId >= 500 && weatherId < 600) return "🌧️";
    if (weatherId >= 600 && weatherId < 700) return "❄️";
    if (weatherId >= 700 && weatherId < 800) return "🌫️";
    if (weatherId === 800) return "☀️";
    if (weatherId > 800 && weatherId < 900) return "☁️";
    return "❓";
}


function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("erorrDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}