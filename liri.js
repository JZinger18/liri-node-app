









// capture commands from command  line argument 
var call = process.argv[2]



// Take in the command line arguments
var nodeArgs = process.argv;

// Create an empty string for holding the input
var input = "";

// Capture all the words in the statemnt
for (var i = 3; i < nodeArgs.length; i++) {

  // Build a string with the input.
  input = input + " " + nodeArgs[i];

}



//object having propoerties of commands
var command = {
	'spotify-this-song': function() {
		initSpotify(input)

	},

	'movie-this': function () {
		initMovie(input)

	},

	'my-tweets': function() {
		tweet()
	},

	'do-what-it-says': function() {
		initDoWhatItSays()

	}
}


//load the NPM Package inquirer
var Spotify = require('node-spotify-api');


// function for spotify method
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





//used to add line spacing
function clean () {
	console.log('====================================')
}






// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");


initMovie = function(input) {
	if(input.length < 1) {
		input = 'Mr. Nobody'
	}

// Then run a request to the OMDB API with the movie specified
request("http://www.omdbapi.com/?t=" + input + "&apikey=40e9cece", function(error, response, body) {

    
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

	});

}


//twitter function 
tweet = function() {

	var twitterOath = require("./key.js");

	var Twitter = require('twitter');
	 
	var client = new Twitter(
	twitterOath.twitterKeys
	);
	 
	var params = {screen_name: 'jzinger18'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    for (var i=0;i<20;i++) {
	    	
	    	console.log('Tweet: ' + tweets[i].text +' \n Timestamp: ' + tweets[i].created_at);
	    	clean()
	}
	  	}	
	});

}



// Do what it says function to be called by command line
initDoWhatItSays = function() {


	//fs is a core Node package for reading and writing files
	var fs = require("fs");

	// The code will store the contents of the reading inside the variable "data"
	fs.readFile("random.txt", "utf8", function(error, tData) {

	  // If the code experiences any errors it will log the error to the console.
	  if (error) {
	    return console.log(error);
	  }

  	// data stored in array for later use.
	var dataArr = tData.split(",");
	tempCommand = dataArr[0];
  	tempInput = dataArr[1];
  	input = tempInput
  	command[tempCommand]()

	});

}





//invoke functions stored in objects for command line commands
command[call]()










