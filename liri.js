require('dotenv').config();

var Spotify = require("node-spotify-api")

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var moment = require('moment');

var fs = require("fs");

var command = process.argv[2];

var request = process.argv.slice(3).join(" ");

function movies() {
    if (command === "movie-this"){
        if(request === "") {
            request = "Mr. Nobody";
        };
    var movieURL = "https://www.omdbapi.com/?apikey=cb8b2228&t=" + request;
        axios.get(movieURL)
        .then(function (response) {
            var movie = response.data;
            console.log(movie.Title);
            console.log(movie.Year);
            console.log(movie.imdbRating);
            console.log(movie.Ratings[1].Value);
            console.log(movie.Country);
            console.log(movie.Language);
            console.log(movie.Plot);
            console.log(movie.Actors);
        });
    };
};

function concerts() {
    var bandsURL = "https://rest.bandsintown.com/artists/" + request + "/events?app_id=codingbootcamp"
    if (command === "concert-this") {
        axios.get(bandsURL).then(function(response) {
            var concert = response.data
            for(var i = 0; i < concert.length; i++){
                console.log(concert[i].venue.name);
                console.log(concert[i].venue.city + ", " + concert[i].venue.country)
                console.log(moment(concert[i].datetime).format("MM/DD/YYYY"));
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    };
};

function songs() {
    if (command === "spotify-this-song"){
        spotify.search({ type: 'track', query: request })
        .then(function(response) {
            var song = response.tracks.items[0];
            console.log(song.artists[0].name);
            console.log(song.name);
            console.log(song.external_urls.spotify);
            console.log(song.album.name);
    })
    .catch(function(err) {
        console.log(err);
        });
    };
};
// confirms that the command is "do-what-it-says"
function justDoIt() {
    if(command === "do-what-it-says") {
        // reads contents of random.txt file
        fs.readFile("random.txt", "utf8", function(error, data) {
            // error check
            if (error) {
                return error
            };
            // puts .txt file contents into an array
            var dataArr = data.split(", ");
            // assigns array elements to comman and request variables
            command = dataArr[0];
            request = dataArr[1];
            
            if (command === "spotify-this-song") {
                songs();
            }
            else if (command === "movie-this") {
                movies();
            }
            else if (command === "concert-this") {
                concerts();
            }
            
            
            // run the other node functions by changing random.txt document, reading those changes and then inserting them into the command line
        })
    };
};

justDoIt();
movies();
songs();
concerts();