'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const server = express();
server.use(cors());

const PORT = process.env.PORT;




//ROUTES
//localhost:3001/weather?searchQuery=Seattle

// server.get('/weather', routeshandler);
server.get('/weather', async (req,res)=>{
    let cityName =req.query.searchQuery;
    console.log("cityNamecityNamecityName", cityName);

let url =`https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${process.env.WEATHER_KEY}&days=5`

    try {
        axios.get(url).then((weatherResults)=>{

            let ForecastArr = weatherResults.data.data.map((item) => {
                // console.log(weatherResults.date);
                return new Forecast(item);

            })
            // console.log(ForecastArr);
            res.send(ForecastArr);
        });
        // console.log(weatherResults);
        
        

    } catch (error) {
        console.log("THE ERROR IS :",error);
        // res.send("error", error);

    }
});

class Forecast {
    constructor(item) {
            this.date = item.datetime;
        this.description = item.weather.description;
    }
}

//localhost:3001/movies?searchQuery=Seattle

server.get('/movies', async (req,res)=>{
    let moviesName =req.query.searchQuery;
    console.log("moviesNamemoviesName", moviesName);

//    let url= `https://api.themoviedb.org/3/search/movie?api_key=162e2e36e10294f626e2fd389bd221cd&query=Seattle&page=1`
let url =`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${moviesName}&page=1`
console.log(url);

    try {
        axios.get(url).then((moviesResults)=>{
            console.log(moviesResults.date);
            let forMoviesArr = moviesResults.data.results.map((item) => {
                // console.log(item.original_title);
                return new ForMovies(item);
            })
            // // console.log(forMovies);
            res.send(forMoviesArr);
        });
        res.send(moviesResults);
        // console.log(weatherResults);
        
        

    } catch (error) {
        console.log("THE ERROR IS :",error);
        // res.send("error", error);

    }
});

class ForMovies {
    constructor(item) {
        this.title = item.original_title;
        this.overview = item.overview;
        this.average_votes = item.vote_average;
        this.total_votes = item.vote_count;
        this.image_url = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
        this.popularity = item.popularity;
        this.released_on = item.release_date;
    }
}


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