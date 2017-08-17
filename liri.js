
// // fs is a core Node package for reading and writing files
// var fs = require("fs");

// // This block of code will read from the "movies.txt" file.
// // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// // The code will store the contents of the reading inside the variable "data"
// fs.readFile("random.txt", "utf8", function(error, tData) {

//   // If the code experiences any errors it will log the error to the console.
//   if (error) {
//     return console.log(error);
//   }

//   // We will then print the contents of data
//   console.log(tData);

//   // Then split it by commas (to make it more readable)
//   var dataArr = tData.split(",");

//   // We will then re-display the content as an array for later use.
//   console.log(dataArr);

// });







// capture commands from command  line argument 
var call = process.argv[2]
// var prompt = process.argv[3]


// Take in the command line arguments
var nodeArgs = process.argv;

// Create an empty string for holding the address
var input = "";

// Capture all the words in the statemnt
for (var i = 3; i < nodeArgs.length; i++) {

  // Build a string with the input.
  input = input + " " + nodeArgs[i];

}

console.log(input)




//object having propoerties of commands
var command = {
	'spotify-this-song': function() {
		initSpotify(input)

	},

	'movie-this': function () {
		initMovie(input)

	},
}


//load the NPM Package inquirer
var Spotify = require('node-spotify-api');

initSpotify = function(input) {

	if(input.length < 1) {
		input = 'ace of base';
	}


var spotify = new Spotify({
	id: '1b919a2ba2a5457d8dc91c5d49bacf3a',
	secret: 'e659a8eee6b8455db4c53370a6b3886a'
})

spotify
	.search({type:'track',query:input,limit:1})
	.then(function(response) {
		data = response
		// console.log(data.tracks.items[0].preview_url)
		artist = data.tracks.items[0].album.artists[0].name
		song = data.tracks.items[0].name
		link = data.tracks.items[0].preview_url
		album = data.tracks.items[0].album.name
		clean()
		console.log('Artist(s): ' + artist)
		console.log('Song: ' + song)
		console.log('Preview Link: ' + link)
		console.log('Album: ' + album)
		clean()
	})
	.catch(function(err) {
		console.log(err)
	})

}






function clean () {
	console.log('====================================')
}




http://www.omdbapi.com/?t=remember+the+titans

// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");


initMovie = function(input) {
	if(input.length < 1) {
		input = 'Mr. Nobody'
	}

// Then run a request to the OMDB API with the movie specified
request("http://www.omdbapi.com/?t=" + input + "&apikey=40e9cece", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  // if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log(body);
     title = JSON.parse(body).Title
    year = JSON.parse(body).Released
    imdbRating = JSON.parse(body).imdbRating
    // rottenRating = JSON.parse(body).imdbRating
    country = JSON.parse(body).Country
    language = JSON.parse(body).Language
    plot = JSON.parse(body).Plot
    actors = JSON.parse(body).Actors
    clean()
    console.log('Title: ' + title)
    console.log('Released Year: ' + year)
    console.log('Country: ' + country)
    console.log('Language: ' + language)
    console.log('Movie Plot: ' + plot)
    console.log('Featured Actors: ' + actors)
    clean()

  // }
});

}


command[call]()










