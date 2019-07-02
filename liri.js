require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios"); 

var fs = require("fs");

// takes user input command method 
var command = process.argv[2];
var search = process.argv.slice(3);

switch (command) {
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThis();
        break;

    case "movie-this":
        movieThis(search);
        break;

    case "do-what-it-says":
        doThis();
        break;
    default:
        console.log('Please enter a valid command');
}

function concertThis() {

}

function spotifyThis() {
    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data.tracks.items[0]); 
      });
}

function movieThis(movie) {
    var query = "http://www.omdbapi.com/?apikey=8de1603b&s=" + movie || 'The Terminator';
    axios.get(query)
  .then(function (response) {
    // handle success
    console.log(response.data.Search[0]);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  }); 
}

// Code to read the "random.txt" file 
function doThis() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data); 
    });
}