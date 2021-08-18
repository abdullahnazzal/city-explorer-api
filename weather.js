'use strict';

const axios = require('axios');
async function getWeather(req, res) {
    let cityName = req.query.searchQuery;
    console.log("cityNamecityNamecityName", cityName);

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${process.env.WEATHER_KEY}&days=5`

    try {
        axios.get(url).then((weatherResults) => {

            let ForecastArr = weatherResults.data.data.map((item) => {
                // console.log(weatherResults.date);
                return new Forecast(item);

            })
            // console.log(ForecastArr);
            res.send(ForecastArr);
        });
        // console.log(weatherResults);



    } catch (error) {
        console.log("THE ERROR IS :", error);
        // res.send("error", error);

    }
}
class Forecast {
    constructor(item) {
        this.date = item.datetime;
        this.description = item.weather.description;
    }
}

module.exports= getWeather;