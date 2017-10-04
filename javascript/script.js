console.log("javascript working!")

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

  database = firebase.database();


$(document).ready(function(){


  $("#search-button").on("click", function(){




    var query = $("#lyrics").val().trim();
    
    console.log(query);

    queryConverted = query.split(" ").join("%20")

    console.log(queryConverted);

    queryURL = "https://rutgers-genius-proxy.herokuapp.com/search?q=" + queryConverted;

    console.log(queryURL);

    $("#lyrics").val("")




  })


})
























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




	