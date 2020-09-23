// Using Tailwind and JQuery create HTML elements for application - Scott
    //Jumbotron for Movie Eaters
    //Row for Movies: Find Movies Here Col, Button Col, and Results Col
    //Row for Eateries Near Movie: Display results


//Link our APIs KEY: 
    //GeoLocation - CF
    const userAllowed =(position) => {
        console.log(position)
    };
    const userDenied =(error) => {
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

