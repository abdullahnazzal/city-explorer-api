'use strict';
const axios = require('axios');

async function getMovies(req, res) {
    let moviesName = req.query.searchQuery;
    console.log("moviesNamemoviesName", moviesName);

    //    let url= `https://api.themoviedb.org/3/search/movie?api_key=162e2e36e10294f626e2fd389bd221cd&query=Seattle&page=1`
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${moviesName}&page=1`
    console.log(url);

    try {
        axios.get(url).then((moviesResults) => {
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
        console.log("THE ERROR IS :", error);
        // res.send("error", error);

    }
}

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

module.exports=getMovies;