require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

// takes user's input and command method 
var command = process.argv[2];
var search = process.argv.slice(3).join(" ");

randomInput(command, search);

function randomInput(command, search) {
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
}

function concertThis(search) {
    const queryURL = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp"
    axios.get(queryURL)
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var date = response.data[i].datetime;
                var newDate = date.split(" ");
                console.log("Name of the Venue: " + response.data[i].venue.name);
                console.log("Venue Location: " + response.data[i].venue.city);
                console.log("Date of the Event: " + moment(newDate[i]).format("MM-DD-YYYY"));
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}

function spotifyThis() {
    if (!search) {
        search = "The Weekend"; 
    }
    else {
    spotify
        .search({ type: 'track', query: search })
        .then(function (response) {
            console.log("Artist's Name: ", response.tracks.items[0].album.artists[0].name);
            console.log("Song: ", response.tracks.items[0].name);
            console.log("URL: ", response.tracks.items[0].external_urls.spotify);
            console.log("Album: ", response.tracks.items[0].album.name);
        })
        .catch(function (err) {
            console.log(err);
        })
    }
}

function movieThis() {
    axios.get("http://www.omdbapi.com/?t=" + search + "&apikey=8de1603b&s")
        .then(function (response) {
            if (response.data.Title === undefined) {
                console.log("Please enter the name of a movie. In the meantime, enjoy this bot suggestion!")
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
        var input = data.split(",");
        console.log(data); 
        command = input[0]; 
        search = input[1]; 
        randomInput(command, search);
    });
}

