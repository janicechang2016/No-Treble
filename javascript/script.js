console.log("javascript file working!");

//Function definition
function getLyrics(songId, imageThumbnail, songTitle, popularity, callback) {
          
          var lyricsURL = "https://rutgers-genius-proxy.herokuapp.com/lyrics/" + songId;

          $.ajax({
            url: lyricsURL,
            method: "GET"
          }).done(function(lyricsResponse) {

            var title = $("<h2>");
            var image = $("<img>");
            var formatspace = $("<br>");
            var formatline = $("<hr>");
            var lyricalContent = $("<p>");
            var mainContentDiv = $("<div>").addClass("container mainContent");
            mainContentDiv.attr("id", songId);
            var lyrics = lyricsResponse.lyrics;
            lyricalContent.text(lyrics);
            lyricsObject[songId] = [songTitle, popularity, lyrics, imageThumbnail];


            formatline.css("width", "55%");
            formatline.css("background-color", "green");
            image.attr("src", imageThumbnail);
            image.attr("height", "250px");
            image.attr("length", "auto");
            image.css("float", "left");
            title.text(songTitle);
            mainContentDiv.append(title);
            mainContentDiv.append(image);
            mainContentDiv.append(lyricalContent);
            mainContentDiv.append(formatspace);
            mainContentDiv.append(formatline);
            $("#lyrics-results").prepend(mainContentDiv);

            //function call of getvid
            callback(songTitle, songId);

          });
        }


//Function Definition
function getvid(full_title, songId){
          var ytapikey = "AIzaSyDdtikdTgNqWJLUg1kHAd_W3V2SyG90pzs";

          console.log(full_title);
          var ytqueryurl = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + full_title + "&type=video&fields=items%2Fid%2FvideoId&key=" + ytapikey;

          $.ajax({
            url: ytqueryurl,
            method: "GET"
          }).done(function(ytvidresponse){

              var iframe = $("<iframe>").attr({"id": "player", "width": "500", "height": "350", "frameborder": "0"});
              var formatspace = $("<br>");
              var formatline = $("<hr>");
              var ytvid_id = ytvidresponse.items[0].id.videoId;
              console.log("ytvid_id: " + ytvid_id);
              console.log("full_title: " + full_title);

              var src = 'https://www.youtube.com/embed/' + ytvid_id;

              formatline.css("width", "55%");
              formatline.css("background-color", "green");
              iframe.attr("src", src);

              var videoDiv = $("<div>");
            
              $(videoDiv).append(iframe);
              $(videoDiv).append(formatspace);
              $(videoDiv).append(formatline);
              $(videoDiv).append(formatspace);

              lyricsObject[songId].videoDiv = videoDiv;

              $("#"+ songId).append(videoDiv);
          });
        }

var lyricsObject = {};

$(document).ready(function() {

  ($(".ql-editor")).addClass("userLyrics");

  $("#search-button").on("click", function() {

    var searchField = $("#lyrics").val().trim();

    if (!localStorage.searches) {

      // Puts the search info into local storage
      localStorage.setItem('searches', 1);
      var searchList = {
        "search#1": searchField
      }
      localStorage.setItem('searchList', JSON.stringify(searchList));
      // console.log("There is now local storage");
      retrievedObject = localStorage.getItem('searchList');
      // console.log("Here is the object in local storage with search history", retrievedObject)
    } else {


      // console.log("There is pre-existing local storage");
      var counter = localStorage.getItem('searches');
      counter++;
      var localObject = JSON.parse(localStorage.getItem('searchList'));
      var searchKey = "search#" + counter;
      localObject[searchKey] = searchField;
      localStorage.setItem('searchList', JSON.stringify(localObject));
      console.log("new search: ", searchField)
      // console.log("Updated search list: ", localObject);
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
      // console.log(mainResponseArray);

      for (i = 0; i < mainResponseArray.length; i++) {
        var songId = mainResponseArray[i].result.id;
        var imageThumbnail = mainResponseArray[i].result.header_image_thumbnail_url;
        var songTitle = mainResponseArray[i].result.title;
        var popularity = mainResponseArray[i].result.stats.pageviews;
        
        getLyrics(songId, imageThumbnail, songTitle, popularity, getvid);

      }
    });

    // console.log("Here is the lyrics object: ", lyricsObject);



  });


  $("#compare-button").on("click", function(event) {
    event.preventDefault();
    console.log("compare button working!")

    // // PROMPT IF  COMPARE BUTTON IS PRESSED BEFORE A SEARCH

    if ($("#lyrics-results")[0].innerText == ""){

      // console.log();

      swal({
        type: "info",
        title: "...Wait a second!",
        text: "Search for an artist/song before you compare",
        confirmButtonText:'<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'Thumbs up, Got it!',
        confirmButtonColor: '#00b300',
      });
      return;
    }




    // variables for user's lyrics
    // var userLyrics = $(".userLyrics").val().trim();
    // console.log(userLyrics)

    var userLyrics = quill.getText(0, );

    console.log(userLyrics)
    var userLyricsArray = userLyrics.split(" ");
    var lyricsOnPage = $(".mainContent");



      // loop for every song on the page

    for (j = 0; j < lyricsOnPage.length; j++) {

      var songId = lyricsOnPage[j].id;

      // variables to grab lyrics from page and create an array of words **NOTE THIS STRIPS THE h2 TAGS FROM SONG NAME SO SLICE IS ADDED TO REMOVE THE SONG NAME IT IS ADDED BACK LATER IN THE LOOP WITH h2 TAGS
      var song = lyricsOnPage[j].textContent.slice( (lyricsObject[songId][0].length),);

      console.log("Here is the mainContent div",lyricsOnPage[j]);


      var songArray = song.split(" ");

    // loop for every word in user's song

    for (i = 0; i < userLyricsArray.length; i++) {



        // loop for every word in the song 

        for (k = 0; k < songArray.length; k++) {



          if (userLyricsArray[i].toLowerCase() == songArray[k].toLowerCase()) {
            // console.log("Word in user's song: ", userLyricsArray[i]);
            // console.log("Word in page's song: ", songArray[k]);


            // console.log("MATCH!")


            songArray[k] = '<span class= "compareMatch">' + songArray[k] + '</span>';
            // console.log(songArray[k], "changed to add class");


          } else {
            // console.log("not a match.")
          }

        }
      }

        
        console.log("Checked every word in the song ", lyricsObject[songId][0]);


        // song array should have items joined and added to the page rendered as html
        // console.log("Here is the song array with span tags on matched words: ", songArray)

        var songWithSpanTags = songArray.join(" ");
        // console.log(songWithSpanTags);

        lyricsObject[songId].songWithSpanTags = songWithSpanTags;
        // console.log(lyricsObject[songId].songWithSpanTags);
        // console.log(lyricsObject);

      console.log($("#"+ songId));

      var mainContentDivWithSongId = $("#"+ songId);
      
      mainContentDivWithSongId[0].innerHTML=  lyricsObject[songId].songWithSpanTags;


            var image = $("<img>");
            var title = $("<h2>");
            console.log(lyricsObject[songId][3]);
            var imageThumbnail = lyricsObject[songId][3];

            title.text(lyricsObject[songId][0]);

            image.attr("src", imageThumbnail);
            image.attr("height", "250px");
            image.attr("length", "auto");
            image.css("float", "left");
            mainContentDivWithSongId.prepend(image);
            mainContentDivWithSongId.prepend(title);
            mainContentDivWithSongId.append(lyricsObject[songId].videoDiv);




    }

  })


});



lastFMAPIkey = 'b9abe3aa8c5870ad9ae952d6b8945b57'
lastFMSharedsecret = '2ac3fd2fc4d4ef9f422fce2935819376'