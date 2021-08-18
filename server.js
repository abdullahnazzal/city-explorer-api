'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const server = express();
server.use(cors());

const PORT = process.env.PORT;

const getWeather=require('./weather');

const getMovies=require('./movies');

//ROUTES
//localhost:3001/weather?searchQuery=Seattle
server.get('/weather', getWeather);

//localhost:3001/movies?searchQuery=Seattle
server.get('/movies', getMovies);




//localhost:3001/weather?searchQuery=Seattle



//  function routeshandler(req, res) {
//     let cityName = req.query.searchQuery;

//     let url =`https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${process.env.WEATHER_KEY}&days=5`;

//     try {
//         let weatherResults = await axios.get(url);
//         console.log("weatherResults.date", weatherResults.date);
//         res.send(weatherResults.date);

//     } catch (error) {
//         console.log(error);
//         res.send("error", error);

//     }

// }
//localhost:3001/weather?searchQuery=Seattle&lat=47.60621&lon=-122.33207
//localhost:3001/weather?searchQuery=Seattle
// server.get('/weather', (req, resp) => {
//     // console.log(req.query);
//     let cityName = req.query.searchQuery;
//     // let citylat = req.query.lat;
//     // let citylon = req.query.lon;
//     console.log(cityName);
//     let SelectedCity = dataInfo.find((item) => {
//         // console.log(item);
//         console.log(item.city_name);

//         if (item.city_name.toLowerCase() === cityName.toLowerCase()) {
//             // ForecastArr.push(new Forecast(item) );
//             return item;
//             // console.log(item);
//         }
//     })
//     try {

//         let ForecastArr = SelectedCity.data.map((item) => {
//             return new Forecast(item);
//         })
//         // console.log(SelectedCite.data[0].weather.description);

//         // ForecastArr.push(new Forecast(SelectedCite) );
//         console.log(ForecastArr);
//         // resp.send(SelectedCite)
//         resp.send(ForecastArr)
//     } catch {

//         resp.send("NOT FOUND: Error We Can't find your data")
//     }


// })

server.get('*', (req, resp) => {

    resp.status(400).send("NOT FOUND")
})







server.listen(PORT, () => {
    console.log(`listing on PORT ${PORT}`);
})