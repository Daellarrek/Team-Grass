// Using Tailwind and JQuery create HTML elements for application - Scott
//Jumbotron for Movie Eaters
//Row for Movies: Find Movies Here Col, Button Col, and Results Col
//Row for Eateries Near Movie: Display results


//Link our APIs KEY: 
//GeoLocation - CF

//hide function for button and search div {}
//if 
//else

const userAllowed = function (position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    console.log(lat)
    console.log(long)
    nearbyMovie(lat, long)
};
const userDenied = function (error) {
    console.error(error)
    // call the hidden function
};
navigator.geolocation.getCurrentPosition(userAllowed, userDenied);





function nearbyMovie(lat, long) {
    //MovieGlu -LP
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
            "device-datetime": "2020-09-23T03:24:31.392Z",
            "geolocation": lat + ";" + long
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

$(document).on('click', '#cinSelector', function (event){
    let cinChoiceLat = $(this).attr('data-lat')
    let cinChoiceLong = $(this).attr('data-long')
    localStorage.setItem('data-lat',cinChoiceLat )
    localStorage.setItem('data-long', cinChoiceLong)
    console.log(cinChoiceLat)
    console.log(cinChoiceLong)
})

$("#goBtn").click(function () {

    let zipCode = document.getElementById("zipInput").value;
    console.log(zipCode)
    zipCoord(zipCode)

});



// console.log(zipCode)

function zipCoord(zipCode) {
    console.log("zipCoord")
    let zipCall = {
        "url": "http://open.mapquestapi.com/geocoding/v1/address?key=ykA4WAc6c08xZnA8CSZQHDNopfYnYhnT&location=" + zipCode + "&maxResults=1",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(zipCall).done(function (response) {
        console.log(response);
    });
}
    //Zomato -DM

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

