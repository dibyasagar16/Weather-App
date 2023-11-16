const apiKey = "dd6c34a27aa7065bca043772c2d613ab";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric";

let temperature = document.getElementById('temp');
let city = document.getElementById('city');
let humidity = document.getElementById('humidity');
let windSpeed = document.getElementById('wind');
let requestCity = document.getElementById('input');
let searchBtn = document.getElementById('btn');
let weatherIcon = document.getElementById('weather-icon');

async function checkWeather() {
    try {
        const response = await fetch(`${apiURL}&q=${requestCity.value}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let data = await response.json();
        temperature.innerHTML = `${Math.round(data.main.temp)}°C`;
        city.innerHTML = data.name;

        humidity.innerHTML = `${data.main.humidity} %`;
        windSpeed.innerHTML = `${data.wind.speed} km/h`;

        if (data.weather[0].main == 'Clouds') {
            weatherIcon.src = "Images/clouds.png";
        }
        else if (data.weather[0].main == 'Clear') {
            weatherIcon.src = "Images/clear.png";
        }
        else if (data.weather[0].main == 'Mist') {
            weatherIcon.src = "Images/mist.png";
        }
        else if (data.weather[0].main == 'Drizzle') {
            weatherIcon.src = "Images/drizzle.png";
        }
        else if (data.weather[0].main == 'Rain') {
            weatherIcon.src = "Images/rain.png";
        }
        else if (data.weather[0].main == 'Snow') {
            weatherIcon.src = "Images/snow.png";
        }
        else if (data.weather[0].main == 'Haze') {
            weatherIcon.src = "Images/haze.png";
        }
        console.log(data);
    } catch (error) {
        let mainError = error.message;
        let apiError = "Status: 401";
        let cityNameError = "Status: 404";
        if (mainError.includes(apiError)) {
            let error = document.getElementById('error1');
            error.style.translate = "0 0"
            setTimeout(() => {
                error.style.translate = "17rem 0"
            }, 2000);
        } else if (mainError.includes(cityNameError)) {
            let error = document.getElementById('error2');
            error.style.translate = "0 0"
            setTimeout(() => {
                error.style.translate = "17rem 0";
            }, 2000);
        }
    }
}

searchBtn.addEventListener('click', () => {
    if (requestCity.value === "") {
        let errorMessage = document.getElementById('error');
        errorMessage.style.translate = "0 0";
        setTimeout(() => {
            errorMessage.style.translate = "15rem 0";
        }, 2000);
    } else {
        checkWeather();
    }
    requestCity.value = "";
})