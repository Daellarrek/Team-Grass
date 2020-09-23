// / Using Tailwind and JQuery create HTML elements for application - Scott
//Jumbotron for Movie Eaters
//Row for Movies: Find Movies Here Col, Button Col, and Results Col
//Row for Eateries Near Movie: Display results
//Link our APIs KEY:
//GeoLocation - CF
//MovieGlu -LP
var settings = {
    "url": "https://api-gate2.movieglu.com/cinemasNearby/?n=5&x-api-key=TI1OJjZRsga77c93g3pAa5dA7ej2iGBZ4hfKcqUS",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "Authorization": "Basic VU5JVl8zOTpNSEQyS1ZCOExMd2c=",
        "x-api-key": "TI1OJjZRsga77c93g3pAa5dA7ej2iGBZ4hfKcqUS",
        "client": "UNIV_39",
        "territory": "US",
        "api-version": "v200",
        "device-datetime": "2020-09-23T03:24:31.392Z",
    },
};

$.ajax(settings).done(function (response) {
    console.log(response);
});
    //Zomato -DM
//Once GeoLocation is pulled then create a click event on Button.
    //Store geolocation in local storage
// Using Tailwind and JQuery create HTML elements for application - Scott
    //Jumbotron for Movie Eaters
    //Row for Movies: Find Movies Here Col, Button Col, and Results Col
    //Row for Eateries Near Movie: Display results


//Link our APIs KEY: 
    //GeoLocation - CF
    const userAllowed = function(position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        console.log(lat)
        console.log(long)
    };
    const userDenied = function(error) {
        console.error(error)
    }; 
    navigator.geolocation.getCurrentPosition(userAllowed, userDenied);





    
    
    //MovieGlu -LP


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

