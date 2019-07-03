require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

// takes user's input and command method 
var command = process.argv[2];
var search = process.argv.slice(3);

switch (command) {
    case "concert-this":
        concertThis(search);
        break;

    case "spotify-this-song":
        spotifyThis(search);
        break;

    case "movie-this":
        movieThis(search);
        break;

    case "do-what-it-says":
        doThis();
        break;
    default:
        console.log("Please enter a valid command!");
}

function concertThis(artist) {
    axios.get("https://rest.bandsintown.com/artists" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log("Venue Name: " + response.venue.name);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function spotifyThis() {
    spotify.search({ type: 'track', query: 'All the Small Things' })
        .then(function (response) {
            console.log(response.data[0]);
        })
        .catch(function (err) {
            console.log(err);
        });
}

function movieThis(movie) {
    axios.get("http://www.omdbapi.com/?t=" + movie + "&apikey=8de1603b&s")
        .then(function (response) {
            if (response.data.Title === undefined) {
                console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/")
                console.log("It's on Netflix!")
            }
            else {
                //print out info 
                console.log("Title: " + response.data.Title);
                console.log("Release movieYear: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}

// Code to read the "random.txt" file 
function doThis() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
    });
}