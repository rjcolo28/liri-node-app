require('dotenv').config();

var Spotify = require("node-spotify-api")

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var command = process.argv[2];

var request = process.argv[3];

var movieURL = "https://www.omdbapi.com/?apikey=cb8b2228&t=" + request;

var bandsURL = "https://rest.bandsintown.com/artists/" + request + "/events?app_id=codingbootcamp"

if (command === "movie-this"){
    axios.get(movieURL)
    .then(function (response) {
        var movie = response.data
        if(request === "") {
            process.argv.push("Mr. Nobody");
            console.log("Title: " + movie.Title);
            console.log("Year: " + movie.Year);
            console.log("IMDB: " + movie.imdbRating);
            console.log("Rotten Tomatoes: " + movie.Ratings[1].Value);
            console.log("Country of Production: " + movie.Country);
            console.log("Language: " + movie.Language);
            console.log("Plot: " + movie.Plot);
            console.log("Cast: " + movie.Actors);
        }
        else{
            console.log("Title: " + movie.Title);
            console.log("Year: " + movie.Year);
            console.log("IMDB: " + movie.imdbRating);
            console.log("Rotten Tomatoes: " + movie.Ratings[1].Value);
            console.log("Country of Production: " + movie.Country);
            console.log("Language: " + movie.Language);
            console.log("Plot: " + movie.Plot);
            console.log("Cast: " + movie.Actors);
        };
    });
};

if (command === "concert-this") {
    axios.get(bandsURL)
    .then(function(response) {
        console.log(response);
    })
};

if (command === "spotify-this-song") {
    spotify
    .search({ type: 'track', query: 'All the Small Things' })
    .then(function(response) {
        console.log(response);
    })
    .catch(function(err) {
        console.log(err);
    });
};