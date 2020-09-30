const userAllowed = function (position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    console.log(lat)
    console.log(long)
    nearbyMovie(lat, long)
    //eateries(lat, long)
};

const userDenied = function (error) {
    console.error(error)
    if (userDenied) {
    }
};

navigator.geolocation.getCurrentPosition(userAllowed, userDenied);
// }
// }
function nearbyMovie(lat, long) {
    let cinHeader = $("<div class='movieSelect'>");
    cinHeader.text("Select A Theater Near You");
    $("#movieResults").append(cinHeader)
    //MovieGlu -LP
    let date = new Date();
    let settings = {
        "url": "https://cors-anywhere.herokuapp.com/api-gate2.movieglu.com/cinemasNearby",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "authorization": "Basic VEVTVF81NjpjbWdTZFNOOFlLa2k=",
            "x-api-key": "Wv9dazQVqm5tCH8xj1ags5YSDN94QyI45pWyMuSP",
            "client": "TEST_56",
            "territory": "US",
            "api-version": "v200",
            "device-datetime": date.toISOString(),
            "geolocation": lat.toFixed(5) + ";" + long.toFixed(5)
        },
    };

   

    $.ajax(settings).done(function (response) {
        for (let i = 0; i < 5; i++) {
            let selector = response.cinemas[i]
            let name = selector.cinema_name;
            let address = selector.address;
            let city = selector.city;
            let state = selector.state;
            let postcode = selector.postcode;
            let lat = selector.lat
            let lng = selector.lng
            let cinBtn = $("<div id='cinSelector'>");
            cinBtn.addClass("max-w-sm bg-indigo-700 hover:bg-indigo-700 rounded overflow-hidden shadow-lg mt-4 mb-4");
            cinBtn.attr('data-lat', lat).attr('data-long', lng)
            let cinName = $("<h4>").text(name);
            cinName.addClass("text-white font-semibold ml-2 mt-2 mb-2")
            let cinAdd = $("<p>").text(address);
            cinAdd.addClass("text-white font-normal ml-2 mt-2 mb-2")
            let lineAddress = $("<p>").text(city + "," + " " + state + " " + postcode);
            lineAddress.addClass("text-white font-normal ml-2 mt-2 mb-2")
            cinBtn.append(cinName, cinAdd, lineAddress);
            $("#movieResults").append(cinBtn);
            console.log(selector);
        }
    });
}

$(document).on('click', '#cinSelector', function (event) {
    let cinChoiceLat = $(this).attr('data-lat')
    let cinChoiceLong = $(this).attr('data-long')
    localStorage.setItem('data-lat', cinChoiceLat)
    localStorage.setItem('data-long', cinChoiceLong)
    eateries(cinChoiceLat, cinChoiceLong)
    console.log(cinChoiceLat)
    console.log(cinChoiceLong)
});

function selector() {
    let zipCode = document.getElementById("zipInput").value;
    console.log(zipCode)
    //TODO: TURN BACK ON
    zipCoord(zipCode)
};

$("#goBtn").click(function (event) {
    event.preventDefault()
    selector()
});

$("#zipForm").on("submit", function (event) {
    event.preventDefault()
    selector()
});
// console.log(zipCode)
// function grabCinema()

function zipCoord(zipCode) {
    //console.log("zipCoord")
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
    $("#movieResults").empty()
    let date = new Date();
    let cinHeader = $("<div class='movieSelect'>");
    cinHeader.text("Select A Theater Near You");
    $("#movieResults").append(cinHeader)
    let settings = {
        "url": "https://api-gate2.movieglu.com/cinemasNearby",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "authorization": "Basic VEVTVF81NjpjbWdTZFNOOFlLa2k=",
            "x-api-key": "Wv9dazQVqm5tCH8xj1ags5YSDN94QyI45pWyMuSP",
            "client": "TEST_56",
            "territory": "US",
            "api-version": "v200",
            "device-datetime": date.toISOString(),
            "geolocation": inputZipLat.toFixed(5) + ";" + inputZipLong.toFixed(5)
        },
    };

    $.ajax(settings).done(function (response) {
        for (let i = 0; i < 5; i++) {
            let selection = response.cinemas[i]
            let name = selection.cinema_name;
            let address = selection.address;
            let city = selection.city;
            let state = selection.state;
            let postcode = selection.postcode;
            let lat = selection.lat
            let lng = selection.lng
            let cinBtn = $("<div id='cinSelector'>");
            cinBtn.addClass("max-w-sm bg-indigo-700 hover:bg-indigo-700 rounded overflow-hidden shadow-lg mt-4 mb-4");
            cinBtn.attr('data-lat', lat).attr('data-long', lng)
            // cinBtn.attr("id", "cards")
            let cinName = $("<h4>").text(name);
            cinName.addClass("text-white font-semibold ml-2 mt-2 mb-2")
            let cinAdd = $("<p>").text(address);
            cinAdd.addClass("text-white font-normal ml-2 mt-2 mb-2")
            let lineAddress = $("<p>").text(city + "," + " " + state + " " + postcode);
            lineAddress.addClass("text-white font-normal ml-2 mt-2 mb-2")
            cinBtn.append(cinName, cinAdd, lineAddress);
            $("#movieResults").append(cinBtn);
            console.log(selection);
        }

    });

}
//Zomato -DM
function eateries(inputZipLat, inputZipLong) {
    $("#eatsHere").empty();
    $(".eatSelect").empty();
    let eatHeader = $("<div class='eatSelect'>");
    eatHeader.text("Select An Eatery");
    $("#eateriesResults").prepend(eatHeader);
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
        
        for (let i = 0; i < 5; i++) {
            let eater = response.restaurants[i]
            let eaterName = eater.restaurant.name
            let eaterAdd = eater.restaurant.location.address
            let eaterCost = eater.restaurant.average_cost_for_two
            let eaterHour = eater.restaurant.timings
            let eaterRate = eater.restaurant.user_rating.aggregate_rating
            let eaterMenu = eater.restaurant.menu_url
            let eatBtn = $("<div>");
            eatBtn.addClass("max-w-sm bg-purple-700 hover:bg-purple-700 rounded overflow-hidden shadow-lg mt-4 mb-4 mr-4");
            eatBtn.attr('data-lat', inputZipLat).attr('data-long', inputZipLong)
            // cinBtn.attr("id", "cards")
            let cinName = $("<h4>").text(eaterName);
            cinName.addClass("text-white font-semibold ml-2 mt-2 mb-2")
            let cinAdd = $("<p>").text("Address: " + eaterAdd);
            cinAdd.addClass("text-white font-normal ml-2 mt-2 mb-2")
            let lineCost = $("<p>").text("Date Night Cost: " + "$" + eaterCost);
            lineCost.addClass("text-white font-normal ml-2 mt-2 mb-2")
            let lineHour = $("<p>").text("Hours: " + eaterHour);
            lineHour.addClass("text-white font-normal ml-2 mt-2 mb-2")
            let lineRate = $("<p>").text("Rating: " + eaterRate);
            lineRate.addClass("text-white font-normal ml-2 mt-2 mb-2")
            let lineMenu = $("<a> View Menu </a>")
            lineMenu.attr("href", eaterMenu).attr("target", "_blank")
            lineMenu.addClass("text-white font-semibold underline ml-2 mt-2 mb-4")
            eatBtn.append(cinName, cinAdd, lineCost, lineHour, lineRate, lineMenu);
            $("#eatsHere").append(eatBtn);
        };
    });
};