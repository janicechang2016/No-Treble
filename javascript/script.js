console.log("javascript working!");

//Initialize Firebase
  var config = {
    apiKey: "AIzaSyBQUeN0tOnqjLjpR3M1W15VAx1XZd8sq8U",
    authDomain: "no-treble.firebaseapp.com",
    databaseURL: "https://no-treble.firebaseio.com",
    projectId: "no-treble",
    storageBucket: "no-treble.appspot.com",
    messagingSenderId: "107363991076"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var queryURL;
  var lyrics;


  // local storage variable should be added to track recent queries

  // var myStorage = window.localStorage;


$(document).ready(function(){

  $("#search-button").on("click", function(){

    var query = $("#lyrics").val().trim().split(" ").join("%20");

    queryURL = "https://rutgers-genius-proxy.herokuapp.com/search?q=" + query;

    console.log(queryURL);


     $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(mainResponse) {
        // console.log(mainResponse)

        mainResponseArray = mainResponse.response.hits;

        for (i = 0; i < mainResponseArray.length; i++) { 
          var mainContentDiv = $("<div>").addClass("container mainContent");

          var title = $("<h2>");
          var image = $("<img>");
          var lyricalContent = $("<p>");
          var songId = mainResponseArray[i].result.id;
          var imageThumbnail = mainResponseArray[i].result.header_image_thumbnail_url;
          var songTitle = mainResponseArray[i].result.title;
          var lyricsURL = "https://rutgers-genius-proxy.herokuapp.com/lyrics/" + songId;
          mainContentDiv.attr("id", songId);
          console.log("Song ID: " + songId);
          // console.log(mainResponseArray[i]);
          // console.log(title);
          // console.log(image);
          // console.log(lyricalContent);
          // console.log(songId);
          // console.log(imageThumbnail);
          // console.log(songTitle);
          // console.log(lyricsURL);

          $.ajax({
            url: lyricsURL,
            method: "GET"
          }).done(function(lyricsResponse){

            if (!lyricsResponse.lyrics){
              console.log("there are no lyrics for this song :(");


            } else{
              console.log("there are lyrics :)");
            }

             console.log("Here are the lyrics for", songId);
            lyrics = lyricsResponse.lyrics;
            lyricalContent.text(lyrics);

          });



          image.attr("src", imageThumbnail);
          image.attr("height", "250px");
          image.attr("length", "auto");
          image.css("float", "left");
          title.text(songTitle);
          mainContentDiv.append(title);
          mainContentDiv.append(image);

          var requestsng = "#" + songId; 

          console.log(requestsng);

          $("#" + songId).append(lyricalContent); 

          //mainContentDiv.append(lyricalContent);

          $("#song-results").prepend(mainContentDiv);


      }
    })


      });

  });





























// queryURL = "https://api.musixmatch.com/ws/1.1/"

// // <script type="text/javascript" src="http://tracking.musixmatch.com/t1.0/AMa6hJCIEzn1v8RuOP">



// apiKey = "6824e3020fba9ce389b04011d47887d4"


// curl --get --include 'https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/artist.get?artist_id=1039' \
//   -H 'X-Mashape-Key: tymAkvmzc3msh93vtoFMlA6lOpxLp1FWvYWjsn4RZdPKYlKIqJ' \
//   -H 'Accept: application/json'


//   // authentication for genius API
// var clientId = "AZgkZko3TFFzayuBtAZWzsNzptuOzSVSUVSEAkbfqbdN5qP7jOPJIyzpcVeW4BKX";



// //    // authentication for genius API
// var clientSecret  = "nYYz8dcvxiLrnMr0Of4jLkRmwuEsJgTUoVwfa6DB5bfMaRJbT9QYdwPdpusW9H_wx6HcE5bOV-56hplJxR851Q"


// // // event handler for button
// // 	$(document).on("click","#", function(){


// // 	var query = $(this)

// // 	// string with API key and query gets concatenated to create URL;
// 	var queryURL = "https://api.genius.com/oauth/authorize" + query + "? ";




	