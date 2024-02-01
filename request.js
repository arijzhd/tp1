
const request = require("request");

const API_KEY = "38f9264b8e345e5059d64b5e08c19663"; 
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";

function getWeatherData(city) {
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fr`;

    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                const data = JSON.parse(body);
                resolve(data);
            }
        });
    });
}

function displayWeatherData(data) {
    console.log("Coordonnées : ", data.coord);

    const weather = data.weather[0];
    console.log("Condition météorologique : ", weather.main);
    console.log("Description : ", weather.description);

    const main = data.main;
    console.log("Température : ", main.temp, "°C");
    console.log("Humidité : ", main.humidity, "%");

    const wind = data.wind;
    console.log("Vitesse du vent : ", wind.speed, "m/s");

    if (data.rain) {
        console.log("Pluie (1h) : ", data.rain["1h"], "mm");
    }

    console.log("Pression : ", main.pressure, "hPa");
    console.log("Nuages : ", data.clouds.all, "%");
}

getWeatherData("Sousse")
    .then(data => displayWeatherData(data))
    .catch(error => console.error("Erreur : ", error));
