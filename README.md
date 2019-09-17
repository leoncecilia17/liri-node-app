# LIRI-Node-App 

## Description 

LIRI is a command line node application that takes in parameters from the user and provides information based on specific commands used. The information is gathered using the following three APIs for information: Spotify for songs, Bands in Town for concerts, and OMDB for movies. 

## Usage 

The command line will expect the base input of: node liri.js with each command. Then, the user has four commands to choose from which are listed below: 

- concert-this (example: node liri.js concert-this calvin harris)
    It will render the name of the venue, venue location, and the date the event will take place which has been formatted using the moment npm package. 

- spotify-this-song (example: node liri.js spotify-this-song wasted times)
    This will print the artist's name, song name, a preview link of the song from Spotify, and the album the song is from. 
    If no song is provided, the user will be provided with a default search of "Truth Hurts" by Lizzo. 

- movie-this (example: node liri.js movie-this lion king)
    This will output the movie's title, release year, IMDB Rating, Rotten Tomatoes Rating, Country of Production, movie language, plot, and a list of the main actors.  
    If no movie is provided, the user will receive a default suggestion of "Mr. Nobody." 

- do-what-it-says (example: node liri.js do-what-it-says)
    Using the fs node package, this application will use the text inside of the random.txt file and use it to call one of the other three LIRI commands. The text inside of random.txt should follow the following format: spotify-this-song,"I want it that way" in order to function. 

## Technology Used 

Data is gathered using the axios package. In order to try out this application, please make sure to install the following npm packages: axios, bandsintown, dotenv, moment, and node-spotify-api. 

## Video Demo 
Please click on the following link to view a video demo of this application: 
https://www.youtube.com/watch?v=GWhJLbGm-Bc&feature=youtu.be

