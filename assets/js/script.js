// Search button click handling
$(".button2").click(function() {
    $(".container").show();
    $(".back-button").show();
});
$(".button2").click(function() {
    $(".card2").hide();
});
$(".back-button").click(function() {
    $(".card2").show();
    $(".back-button").hide();
});
$(".back-button").click(function() {
    $(".container").hide();
});

//Movement animation piece
const card = document.querySelector('.card');
const container = document.querySelector('.container');
const title = document.querySelector('.title');
const map = document.querySelector('.map');
const description = document.querySelector(".description");
const list = document.querySelector(".list");
const moreinfo = document.querySelector(".more-info");
const weather = document.querySelector(".weather");
const trails = document.querySelector(".trails");

//Animation event
container.addEventListener('mousemove', (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerWidth / 2 - e.pageY) / 25;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});
//Animate in
container.addEventListener("mouseenter", (e) => {
    card.style.transition = "none";
    //Pop out
    title.style.transform = "translateZ(80px)";
    map.style.transform = "translateZ(50px)";
    description.style.transform = "translateZ(50px)";
    weather.style.transform = "translateZ(50px)";
    trails.style.transform = "translateZ(60px)";
    //moreinfo.style.transform = "translateZ(80px)";
});
//Animate out
container.addEventListener("mouseleave", (e) => {
    card.style.transition = "all 0.5s ease";
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
    //Pop back
    title.style.transform = "translateZ(0px)";
    map.style.transform = "translateZ(0px)";
    description.style.transform = "translateZ(0px)";
    weather.style.transform = "translateZ(0px)";
    trails.style.transform = "translateZ(0px)";
    //moreinfo.style.transform = "translateZ(0px)";
});

// -----------------------------------------------------------------------------------------
var currentTime = (moment().format('MM/DD/YYYY'));
var apiKey = "78abac7397dbff0934df4ef82fc5fd58";
var apiKey2 = "200974984-c9f2b134614b531af1bbb9832b1b52b5";
var query = document.getElementById("search-term");
var maps = document.getElementById("map");
console.log(currentTime);

// Maps object
var images = {
    Alabama: "./assets/images/alabama.png",
    Alaska: "./assets/images/alaska.png",
    Arizona: "./assets/images/arizona.png",
    Arkansas: "./assets/images/arkansas.png",
    California: "./assets/images/california.png",
    Colorado: "./assets/images/colorado.png",
    Connecticut: "./assets/images/connecticut.png",
    Delaware: "./assets/images/delaware.png",
    Florida: "./assets/images/florida.png",
    Georgia: "./assets/images/georgia.png",
    Hawaii: "./assets/images/hawaii.png",
    Idaho: "./assets/images/idaho.png",
    Illinois: "./assets/images/illinois.png",
    Indiana: "./assets/images/indiana.png",
    Iowa: "./assets/images/iowa.png",
    Kansas: "./assets/images/kansas.png",
    Kentucky: "./assets/images/kentucky.png",
    Louisiana: "./assets/images/louisiana.png",
    "State of Maine": "./assets/images/maine.png",
    Maryland: "./assets/images/maryland.png",
    Massachusetts: "./assets/images/massachusetts.png",
    Michigan: "./assets/images/michigan.png",
    Minnesota: "./assets/images/minnesota.png",
    Mississippi: "./assets/images/mississippi.png",
    Missouri: "./assets/images/missouri.png",
    Montana: "./assets/images/montana.png",
    Nebraska: "./assets/images/nebraska.png",
    Nevada: "./assets/images/nevada.png",
    "New Hampshire": "./assets/images/newhampshire.png",
    "New Jersey": "./assets/images/newjersey.png",
    "New Mexico": "./assets/images/newmexico.png",
    "New York": "./assets/images/newyork.png",
    "North Carolina": "./assets/images/northcarolina.png",
    "North Dakota": "./assets/images/northdakota.png",
    Ohio: "./assets/images/ohio.png",
    Oklahoma: "./assets/images/oklahoma.png",
    Oregon: "./assets/images/oregon.png",
    Pennsylvania: "./assets/images/pennsylvania.png",
    "Rhode Island": "./assets/images/rhodeisland.png",
    "South Carolina": "./assets/images/southcarolina.png",
    "South Dakota": "./assets/images/southdakota.png",
    Tennessee: "./assets/images/tennessee.png",
    Texas: "./assets/images/texas.png",
    Utah: "./assets/images/utah.png",
    Vermont: "./assets/images/vermont.png",
    Virginia: "./assets/images/virginia.png",
    Washington: "./assets/images/washington.png",
    "West Virginia": "./assets/images/westvirginia.png",
    Wisconsin: "./assets/images/wisconsin.png",
    "State of Wyoming": "./assets/images/wyoming.png"
};

// Search on enter keyup
query.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("searchbtn").click();
    }
});

// UV index
function uvIndex(lng, lat) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lng}`,
        method: "GET"
    })
        .then(function (response1) {

            $(".uvIndex").html("UV Index: " + `<span class=" badge badge-danger">${(response1.value)}</span>`);
        });
};
function successFunction(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;

    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&appid=${apiKey}`,
        method: "GET"
    })
        .then(function (response) {
            updateLocation(response);
        });
    uvIndex(lng, lat);
};

// Trails
function getTrails(lng,lat) {
    $.ajax({
        url: `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&key=${apiKey2}`,
        method: "GET"
    })
        .then(function (response){
            console.log(response.trails[0]);
            $("#trail1").html(`<h2>${response.trails[0].name}</h2>`);
            $("#trail2").html(`<h2>${response.trails[1].name}</h2>`);
            $("#trail3").html(`<h2>${response.trails[2].name}</h2>`);
            $("#trail4").html(`<h2>${response.trails[3].name}</h2>`);
            $("#trail5").html(`<h2>${response.trails[4].name}</h2>`);
            $("#location1").text(response.trails[0].location);
            $("#location2").text(response.trails[1].location);
            $("#location3").text(response.trails[2].location);
            $("#location4").text(response.trails[3].location);
            $("#location5").text(response.trails[4].location);
            $("#difficulty1").text("Difficulty: " + response.trails[0].difficulty);
            $("#difficulty2").text("Difficulty: " + response.trails[1].difficulty);
            $("#difficulty3").text("Difficulty: " + response.trails[2].difficulty);
            $("#difficulty4").text("Difficulty: " + response.trails[3].difficulty);
            $("#difficulty5").text("Difficulty: " + response.trails[4].difficulty);
            $("#length1").text("Length: " + response.trails[0].length + " miles");
            $("#length2").text("Length: " + response.trails[1].length + " miles");
            $("#length3").text("Length: " + response.trails[2].length + " miles");
            $("#length4").text("Length: " + response.trails[3].length + " miles");
            $("#length5").text("Length: " + response.trails[4].length + " miles");
            $("#url1").text("More information").attr("href", response.trails[0].url);
            $("#url2").text("More information").attr("href", response.trails[1].url);
            $("#url3").text("More information").attr("href", response.trails[2].url);
            $("#url4").text("More information").attr("href", response.trails[3].url);
            $("#url5").text("More information").attr("href", response.trails[4].url); 
        });
};

// Update location
function updateLocation(response) {
    $(".city").html(`<h2>${response.name} (${currentTime}) <img src="https://openweathermap.org/img/w/${response.weather[0].icon}.png"></h2>`);
    $(".humidity").text("Humidity: " + Math.round(response.main.humidity) + "%");
    $(".temperature").text("Temperature: " + Math.round(response.main.temp) + "°F");
    $(".title").html(response.name);
    maps.src = images[response.name];

    if (response.name === "State of Maine") {
        $(".title").text("Maine");
        $(".trail-desc").text("BEST HIKING TRAILS IN MAINE")
    } else if (response.name === "State of Wyoming") {
        $(".title").text("Wyoming");
        $(".trail-desc").text("BEST HIKING TRAILS IN WYOMING") ;
    } else {
        $(".trail-desc").text("BEST HIKING TRAILS IN " + response.name);
    };
};

// State search function
function stateSearch() {
    $(".button2").click(function (event) {
        //this event prevents default refreshing of the page upon button click
        event.preventDefault("click")
        let city = $("#search-term").val().trim();
        if (city != '') {
            $.ajax({
                url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`,
                method: "GET"
            }).then(function (response) {
                updateLocation(response);
                uvIndex(response.coord.lon, response.coord.lat)
                getTrails(response.coord.lon, response.coord.lat)
            });
        }
    })
};
stateSearch();

const cityInfo = async (city) => {
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    const response = await fetch(queryURL);
    const result = await response.json();
    return result;
};

const buttonClick = (city) => {
    cityInfo(city).then(response => {
        updateLocation(response);
        uvIndex(response.coord.lon, response.coord.lat);
        getTrails(response.coord.lon, response.coord.lat);
    });
};