


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
  var searchField;


  // local storage variable should be added to track recent queries

  // var myStorage = window.localStorage;


$(document).ready(function(){

  $("#search-button").on("click", function(){

    searchField = $("#lyrics").val().trim();

    if (!localStorage.searches){

    // Puts the search info into local storage
    localStorage.setItem('searches', 1);
    localStorage.setItem("search#" + 1, searchField);
    console.log("There is now local Storage");
  } else{
    console.log("There is preexisting localStorage");
    var counter = localStorage.getItem('searches');
    localStorage.setItem("search#" + counter, searchField);
    counter++;
    localStorage.setItem('searches', counter);
  }

    var query = searchField.split(" ").join("%20");

    queryURL = "https://rutgers-genius-proxy.herokuapp.com/search?q=" + query;

    console.log(queryURL);


     $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(mainResponse) {
        // console.log(mainResponse)

        mainResponseArray = mainResponse.response.hits;

        for (i = 0; i < mainResponseArray.length; i++) { 
          var songId = mainResponseArray[i].result.id;          
          var imageThumbnail = mainResponseArray[i].result.header_image_thumbnail_url;
          var songTitle = mainResponseArray[i].result.title;
          getLyrics(songId, imageThumbnail, songTitle);


          function getLyrics(songId, imageThumbnail, songTitle ){
            console.log(imageThumbnail);
            console.log(songTitle);
            console.log(songId);



          var lyricsURL = "https://rutgers-genius-proxy.herokuapp.com/lyrics/" + songId;

          $.ajax({
            url: lyricsURL,
            method: "GET"
          }).done(function(lyricsResponse){

            if (!lyricsResponse.lyrics){
              console.log("there are no lyrics for this song :(");


            } else{
              console.log("there are lyrics :)");
            }

             console.log("Here are the lyrics for", songId, lyricsResponse.lyrics.slice(0,150));


          var title = $("<h2>");
          var image = $("<img>");
          var lyricalContent = $("<p>");
          var mainContentDiv = $("<div>").addClass("container mainContent");
          mainContentDiv.attr("id", songId);
          lyrics = lyricsResponse.lyrics;
          lyricalContent.text(lyrics);




          image.attr("src", imageThumbnail);
          image.attr("height", "250px");
          image.attr("length", "auto");
          image.css("float", "left");
          title.text(songTitle);
          mainContentDiv.append(title);
          mainContentDiv.append(image);
          mainContentDiv.append(lyricalContent);

          $("#song-results").append(mainContentDiv);





             
          });
        }


      }
    })


      });

  


  });







	