


console.log("javascript file working!");

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
  var lyricsObject = {};

$(document).ready(function(){

  $("#search-button").on("click", function(){

    var searchField = $("#lyrics").val().trim();

    if (!localStorage.searches){

    // Puts the search info into local storage
    localStorage.setItem('searches', 1);
    var searchList = {"search#1": searchField }
    localStorage.setItem('searchList',  JSON.stringify(searchList));
    console.log("There is now local storage");
    retrievedObject = localStorage.getItem('searchList');
    console.log("Here is the object in local storage with search history",retrievedObject)
  } else{


    console.log("There is pre-existing local storage");
    var counter = localStorage.getItem('searches');
    counter++;
    var localObject = JSON.parse(localStorage.getItem('searchList'));
    var searchKey = "search#"+ counter;
    localObject[searchKey] = searchField;
    localStorage.setItem('searchList', JSON.stringify(localObject));
    console.log("new search: ", searchField)
    console.log("Updated search list: ", localObject);
    localStorage.setItem('searches', counter)

  }

    var query = searchField.split(" ").join("%20");

    var queryURL = "https://rutgers-genius-proxy.herokuapp.com/search?q=" + query;

    // console.log(queryURL);


     $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(mainResponse) {
        // console.log(mainResponse)

        mainResponseArray = mainResponse.response.hits;
        console.log(mainResponseArray);

        for (i = 0; i < mainResponseArray.length; i++) { 
          var songId = mainResponseArray[i].result.id;          
          var imageThumbnail = mainResponseArray[i].result.header_image_thumbnail_url;
          var songTitle = mainResponseArray[i].result.title;
          var popularity = mainResponseArray[i].result.stats.pageviews;
          getLyrics(songId, imageThumbnail, songTitle, popularity);


          function getLyrics(songId, imageThumbnail, songTitle, popularity){
            // console.log(imageThumbnail);
            // console.log(songTitle);
            // console.log(songId);



          var lyricsURL = "https://rutgers-genius-proxy.herokuapp.com/lyrics/" + songId;

          $.ajax({
            url: lyricsURL,
            method: "GET"
          }).done(function(lyricsResponse){

            // if (!lyricsResponse.lyrics){
            //   console.log("There are no lyrics for songID#", songId, " :(");


            // } else{
            //   console.log("There are lyrics for songID#", songId ," :)");
            // }

            //  console.log("Here are the lyrics for songId#", songId, songTitle, lyricsResponse.lyrics.slice(0,150));


          var title = $("<h2>");
          var image = $("<img>");
          var lyricalContent = $("<p>");
          var mainContentDiv = $("<div>").addClass("container mainContent");
          mainContentDiv.attr("id", songId);
          var lyrics = lyricsResponse.lyrics;
          lyricalContent.text(lyrics);
          lyricsObject[songId] = [songTitle, popularity, lyrics];




          image.attr("src", imageThumbnail);
          image.attr("height", "250px");
          image.attr("length", "auto");
          image.css("float", "left");
          title.text(songTitle);
          mainContentDiv.append(title);
          mainContentDiv.append(image);
          mainContentDiv.append(lyricalContent);
          $("#lyrics-results").prepend(mainContentDiv);

             
          });
        }


      }
    });   

      console.log("Here is the lyrics object: ", lyricsObject);

  

      });


$("#compare-button").on("click", function(event){
  event.preventDefault();

  // // PROMPT IF  COMPARE BUTTON IS PRESSED BEFORE A SEARCH

  // if (!$("#lyrics-results") == ""){

  //   swal("Search for an artist/song before you compare.");;

  // }else{



  // variables for user's lyrics
  var userLyrics = $("#userLyrics").val().toLowerCase().trim();
  var userLyricsArray = userLyrics.split(" ");
  var lyricsOnPage = $(".mainContent");
  
  for (i = 0; i< userLyricsArray.length; i++){

    
    for (j = 0; j < lyricsOnPage.length; j++){
        // variables for page lyrics
        var song = lyricsOnPage[j].textContent.toLowerCase();
    

      var songArray = song.slice(0,300).split(" ");


      for (k = 0; k < songArray.length; k++){
      console.log("Word in user's song: ", userLyricsArray[i]);
      console.log("Word in page's song: ", songArray[k]);

      if (userLyricsArray[i] == songArray[k] ){
        console.log("MATCH!")
        // add span class with highlight feature in CSS
        // userLyricsArray[i].replace(userLyricsArray[i])


      } 
      // else{
      //   console.log("not a match.")
      // }

      }



    }
  }
})


  });





lastFMAPIkey =  'b9abe3aa8c5870ad9ae952d6b8945b57'
lastFMSharedsecret = '2ac3fd2fc4d4ef9f422fce2935819376'



	