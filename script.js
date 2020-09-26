// Using Tailwind and JQuery create HTML elements for application - Scott
//Jumbotron for Movie Eaters
//Row for Movies: Find Movies Here Col, Button Col, and Results Col
//Row for Eateries Near Movie: Display results
//Link our APIs KEY: 
//GeoLocation - CF
//hide function for button and search div {}
//if 
//else
// if the user approves location grab user Allowed function and move forward with the ajax call
// if the user denies location then wait for user to enter in zipcode than grab lat and long from local storage and run ajax call again. 
// function findMovies() {
const userAllowed = function (position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    console.log(lat)
    console.log(long)
    //nearbyMovie(lat, long)
    eateries(lat, long)
};
const userDenied = function (error) {
    console.error(error)
    if (userDenied) {

    }
    // call the hidden function
};
navigator.geolocation.getCurrentPosition(userAllowed, userDenied);
// }
// }
function nearbyMovie(lat, long) {
    //MovieGlu -LP

    let date = new Date();
    let settings = {
        "url": "https://cors-anywhere.herokuapp.com/api-gate2.movieglu.com/cinemasNearby",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "authorization": "Basic VUE6WUVwTXZHT2tqaXZr",
            "x-api-key": "gsKMErlHzm91drFW8RjLJ2pVz2wmxF0M5WBrq22P",
            "client": "UA",
            "territory": "US",
            "api-version": "v200",
            "device-datetime": date.toISOString(),
            "geolocation": lat.toFixed(5) + ";" + long.toFixed(5)
        },
    };
    $.ajax(settings).done(function (response) {
        for (let i = 0; i < 5; i++) {
            let name = response.cinemas[i].cinema_name;
            let address = response.cinemas[i].address;
            let city = response.cinemas[i].city;
            let state = response.cinemas[i].state;
            let postcode = response.cinemas[i].postcode;
            let cinBtn = $("<div id='cinSelector'>");
            cinBtn.addClass("max-w-sm bg-red-700 hover:bg-red-800 rounded overflow-hidden shadow-lg mt-4 mb-4");
            cinBtn.attr('data-lat', lat).attr('data-long', long)
            // cinBtn.attr("id", "cards")
            let cinName = $("<h4>").text(name);
            cinName.addClass("text-white font-semibold ml-2 mt-2 mb-2")
            let cinAdd = $("<p>").text(address);
            cinAdd.addClass("text-white font-normal ml-2 mt-2 mb-2")
            let lineAddress = $("<p>").text(city + "," + " " + state + " " + postcode);
            lineAddress.addClass("text-white font-normal ml-2 mt-2 mb-2")
            cinBtn.append(cinName, cinAdd, lineAddress);
            $("#eateriesResults").append(cinBtn);
            console.log(response.cinemas[i]);
        }
    });
    // $("#eateriesResults").text(cinemas[0].cinema_name);
}
$(document).on('click', '#cinSelector', function (event) {
    let cinChoiceLat = $(this).attr('data-lat')
    let cinChoiceLong = $(this).attr('data-long')
    localStorage.setItem('data-lat', cinChoiceLat)
    localStorage.setItem('data-long', cinChoiceLong)
    eateries(cinChoiceLat, cinChoiceLong)
    console.log(cinChoiceLat)
    console.log(cinChoiceLong)
})
$("#goBtn").click(function (event) {
    event.preventDefault()
    let zipCode = document.getElementById("zipInput").value;
    console.log(zipCode)
    //TODO: TURN BACK ON
    //zipCoord(zipCode)
});

$("#zipForm").on("submit", function (event) {
    event.preventDefault()
    let zipCode = document.getElementById("zipInput").value;
    console.log(zipCode)
    // TODO: TURN BACK ON
    //zipCoord(zipCode)
});
// console.log(zipCode)
// function grabCinema()


function zipCoord(zipCode) {
    // console.log("zipCoord")
    let zipCall = {
        "url": "http://open.mapquestapi.com/geocoding/v1/address?key=ykA4WAc6c08xZnA8CSZQHDNopfYnYhnT&location=" + zipCode + "&maxResults=1",
        "method": "GET",
        "timeout": 0,
    };
    $.ajax(zipCall).done(function (response) {
        let inputZipLat = response.results[0].locations[0].displayLatLng.lat
        let inputZipLong = response.results[0].locations[0].displayLatLng.lng
        console.log(inputZipLat)
        console.log(inputZipLong)
        console.log(response);
        nearbyMovieZip(inputZipLat, inputZipLong)

    });
}
function nearbyMovieZip(inputZipLat, inputZipLong) {
    //MovieGlu -LP

    let date = new Date();


    let settings = {
        "url": "https://api-gate2.movieglu.com/cinemasNearby",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "authorization": "Basic VUE6WUVwTXZHT2tqaXZr",
            "x-api-key": "gsKMErlHzm91drFW8RjLJ2pVz2wmxF0M5WBrq22P",
            "client": "UA",
            "territory": "US",
            "api-version": "v200",
            "device-datetime": date.toISOString(),
            "geolocation": inputZipLat + ";" + inputZipLong
        },
    };
    $.ajax(settings).done(function (response) {
        for (let i = 0; i < 5; i++) {
            let name = response.cinemas[i].cinema_name;
            let address = response.cinemas[i].address;
            let city = response.cinemas[i].city;
            let state = response.cinemas[i].state;
            let postcode = response.cinemas[i].postcode;
            let cinBtn = $("<div id='cinSelector'>");
            cinBtn.addClass("max-w-sm bg-red-700 hover:bg-red-800 rounded overflow-hidden shadow-lg mt-4 mb-4");
            cinBtn.attr('data-lat', inputZipLat).attr('data-long', inputZipLong)
            // cinBtn.attr("id", "cards")
            let cinName = $("<h4>").text(name);
            cinName.addClass("text-white font-semibold ml-2 mt-2 mb-2")
            let cinAdd = $("<p>").text(address);
            cinAdd.addClass("text-white font-normal ml-2 mt-2 mb-2")
            let lineAddress = $("<p>").text(city + "," + " " + state + " " + postcode);
            lineAddress.addClass("text-white font-normal ml-2 mt-2 mb-2")
            cinBtn.append(cinName, cinAdd, lineAddress);
            $("#eateriesResults").append(cinBtn);
            console.log(response.cinemas[i]);
        }
    });
    // $("#eateriesResults").text(cinemas[0].cinema_name);
}
//Zomato -DM
function eateries(inputZipLat, inputZipLong) {

    $.ajax({
        method: "GET",
        crossDomain: true,
        url: "https://developers.zomato.com/api/v2.1/search?count=6&lat=" + inputZipLat + "&lon=" + inputZipLong,
        dataType: "json",
        async: true,
        headers: {
            "user-key": "78eec3356339522d7f29641a11a4adee"
        },


    }).then(function (response) {
        console.log(response)
        let eaterName = response.resturaunts[i].resturaunt.name
        let eaterAdd = response.resturaunts[i].resturaunt.location.address
        let eaterCost = response.resturaunts[i].resturaunt.average_cost_for_two
        let eaterHour = response.resturaunts[i].resturaunt.timings
        let eaterRate = response.resturaunts[i].resturaunt.user_rating.aggregate_rating
        let eaterMenu = response.resturaunts[i].resturaunt.menu_url

        let eatBtn = $("<div id='cinSelector'>");
        eatBtn.addClass("max-w-sm bg-blue-700 hover:bg-blue-800 rounded overflow-hidden shadow-lg mt-4 mb-4");
        eatBtn.attr('data-lat', inputZipLat).attr('data-long', inputZipLong)
        // cinBtn.attr("id", "cards")
        let cinName = $("<h4>").text(name);
        cinName.addClass("text-white font-semibold ml-2 mt-2 mb-2")
        let cinAdd = $("<p>").text(address);
        cinAdd.addClass("text-white font-normal ml-2 mt-2 mb-2")
        let lineAddress = $("<p>").text(city + "," + " " + state + " " + postcode);
        lineAddress.addClass("text-white font-normal ml-2 mt-2 mb-2")
        cinBtn.append(cinName, cinAdd, lineAddress);
        $("#eateriesResults").append(eatBtn);



    });

};









    //Once GeoLocation is pulled then create a click event on Button.
        //Store geolocation in local storage 
        //Grab local storage MovieGlu API ??? Look that up!
    //AJAX Call for MovieGlu API
        //Display Results of theaters near geolocation  in results here col
            // Objects to pull: Name of Theater, Address, Location (Lat/Long)
            //Objects to display: Name of Theater, Address, Distance from Geolocation
    //In "Results Here" create a click event that selects theater location and grabs (Lat/Long)
    // (Lat/Long) of theater to Zomato API, which will return eateries (10 closest)
    //AJAX call for Zomato API
