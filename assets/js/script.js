$(".state-select").change(function () {
  $(".container").show();
  var query = document.getElementById("search-term").value;
  maps.src = images[query];
  console.log(query);
});

//Movement animation piece
const card = document.querySelector(".card");
const container = document.querySelector(".container");
const title = document.querySelector(".title");
const map = document.querySelector(".map");
const description = document.querySelector(".description");
const list = document.querySelector(".list");
const moreinfo = document.querySelector(".more-info");
const weather = document.querySelector(".weather");

//Animation event
container.addEventListener("mousemove", (e) => {
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
  weather.style.transform = "translateZ(60px)";
  moreinfo.style.transform = "translateZ(80px)";
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
  moreinfo.style.transform = "translateZ(0px)";
});

// -----------------------------------------------------------------------------------------
var currentTime = moment().format("MM/DD/YY");
var apiKey = "78abac7397dbff0934df4ef82fc5fd58";
var query = document.getElementById("search-term");
var maps = document.getElementById("map");

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
  Maine: "./assets/images/maine.png",
  Maryland: "./assets/images/maryland.png",
  Massachusetts: "./assets/images/massachusetts.png",
  Michigan: "./assets/images/michigan.png",
  Minnesota: "./assets/images/minnesota.png",
  Mississippi: "./assets/images/mississippi.png",
  Missouri: "./assets/images/missouri.png",
  Montana: "./assets/images/montana.png",
  Nebraska: "./assets/images/nebraska.png",
  Nevada: "./assets/images/nevada.png",
  "New Hampshire": "./assets/images/new-hampshire.png",
  "New Jersey": "./assets/images/new-jersey.png",
  "New Mexico": "./assets/images/new-mexico.png",
  "New York": "./assets/images/new-york.png",
  "North Carolina": "./assets/images/north-carolina.png",
  "North Dakota": "./assets/images/north-dakota.png",
  Ohio: "./assets/images/ohio.png",
  Oklahoma: "./assets/images/oklahoma.png",
  Oregon: "./assets/images/oregon.png",
  Pennsylvania: "./assets/images/pennsylvania.png",
  "Rhode Island": "./assets/images/rhode-island.png",
  "South Carolina": "./assets/images/south-carolina.png",
  "South Dakota": "./assets/images/south-dakota.png",
  Tennessee: "./assets/images/tennessee.png",
  Texas: "./assets/images/texas.png",
  Utah: "./assets/images/utah.png",
  Vermont: "./assets/images/vermont.png",
  Virginia: "./assets/images/virginia.png",
  Washington: "./assets/images/washington.png",
  "West Virginia": "./assets/images/west-virginia.png",
  Wisconsin: "./assets/images/wisconsin.png",
  Wyoming: "./assets/images/wyoming.png",
};

console.log(currentTime);

$("#search-term").keypress(function (e) {
  if (e.which == 13) {
    $("#search-term").change();
  }
});

// UV index
function uvIndex(lng, lat) {
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lng}`,
    method: "GET",
  }).then(function (response1) {
    $(".uvIndex").html(
      " UV Index: " +
        `<span class=" badge badge-danger">${response1.value}</span>`
    );
  });
}

let geocoder;

function successFunction(position) {
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;
  console.log(lat, lng);

  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&appid=${apiKey}`,
    method: "GET",
  }).then(function (response) {
    updateLocation(response);
  });
  uvIndex(lng, lat);
}

function updateLocation(response) {
  $(".date").html(`<h2>${currentTime}:</h2>`);
  $(".weather-icon").html(
    `<h2><img src="https://openweathermap.org/img/w/${response.weather[0].icon}.png"></h2>`
  );
  $(".temperature").text("Temp: " + Math.round(response.main.temp) + "°F");
  $(".title").html(response.name);
  // maps.src = images[response.name];
  if (response.name === "State of Maine") {
    $(".title").text("Maine");
    // $(".trail-desc").text("BEST TRAILS IN MAINE")
  } else if (response.name === "State of Wyoming") {
    $(".title").text("Wyoming");
    // $(".trail-desc").text("BEST TRAILS IN WYOMING") ;
  } else {
    // $(".trail-desc").text("BEST TRAILS IN " + response.name);
  }
}

function errorFunction() {
  alert("Geocoder failed");
}

function citySearch() {
  $(".state-select").change(function (event) {
    //this event prevents default refreshing of the page upon button click
    event.preventDefault("change");
    let city = $("#search-term").val().trim();
    if (city != "") {
      $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`,
        method: "GET",
      }).then(function (response) {
        updateLocation(response);
        uvIndex(response.coord.lon, response.coord.lat);
      });
    }
  });
}
citySearch();

const cityInfo = async (city) => {
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  const response = await fetch(queryURL);
  const result = await response.json();
  return result;
};

const buttonClick = (city) => {
  cityInfo(city).then((response) => {
    updateLocation(response);
    uvIndex(response.coord.lon, response.coord.lat);
  });
};
