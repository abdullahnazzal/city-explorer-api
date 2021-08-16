'use strict';

const express = require('express');

const dataInfo = require('./data/weather.json');

require('dotenv').config();
const cors = require('cors');

const server = express();

const PORT = process.env.PORT;
server.use(cors());

class Forecast {
    constructor(item) {
        this.date = item.data[0].datetime;
        this.description = item.data[0].weather.description;
    }
}

//localhost:3001/weather?searchQuery=Seattle&lat=47.60621&lon=-122.33207
server.get('/weather', (req, resp) => {
    let ForecastArr=[];
    // console.log(req.query);
    let cityName = req.query.searchQuery;
    let citylat = req.query.lat;
    let citylon = req.query.lon;
    let SelectedCite = dataInfo.find((item) => {
        // console.log(item);
        if (item.city_name === cityName && item.lat === citylat && item.lon === citylon) {
            // ForecastArr.push(new Forecast(item) );
            return item;
            // console.log(item);
        }
    })
    try {
        // let ForecastArr = SelectedCite.data.map((item) => {
            // console.log(SelectedCite.data[0].weather.description);
            ForecastArr.push(new Forecast(SelectedCite) );
            // return new Forecast(SelectedCite)
        // })

        // resp.send(SelectedCite)
        resp.send(ForecastArr)
    } catch {

        resp.send("NOT FOUND: Error We Can't find your data")
    }


console.log(ForecastArr);
})

server.get('*', (req, resp) => {

    resp.status(400).send("NOT FOUND")
})







server.listen(PORT, () => {
    console.log("listing on PORT 3001");
})