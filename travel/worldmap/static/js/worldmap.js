

var all_Locations;


var testText;

var markers = [];
var markersNames = [];
var markersPositions;

//the global map object to point to the google map
var map;

//function to get lng and lat for a specific location
function getLngLat(name){
var csrftoken = getCookie('csrftoken');
var data = {location : name, csrfmiddlewaretoken: csrftoken};
    $.post('location_LngLat/', data, function(response){
            var response = JSON.parse(response);
            var a = document.getElementById('lngRestaurant');
            a.value = response[0].lng;
            var b = document.getElementById('latRestaurant');
            b.value = response[0].lat;
    });

}

//function to get airportCode for a specific location
function getAirportCode(name){
var csrftoken = getCookie('csrftoken');
var data = {location : name, csrfmiddlewaretoken: csrftoken};
    $.post('location_AirportCode/', data, function(response){

            var a = document.getElementById('location');
            a.value = response;
            var b = document.getElementById('destination');
            b.value = response;
    });

}

//function to get all the locations for the markers
function getLocations(){
var csrftoken = getCookie('csrftoken');
var data = {csrfmiddlewaretoken: csrftoken};
    $.post('locations/', data, function(response){
            var response = JSON.parse(response);
            all_Locations = response;
            createAllMarkers();
    });

}

//function to get locationsByType
function getLocationsByType(name){
var csrftoken = getCookie('csrftoken');
var data = { type : name, csrfmiddlewaretoken: csrftoken};
    $.post('locationsByType/', data, function(response){
            var response = JSON.parse(response);
            //set the returned locations as a global variable to use it later to create the markers
            all_Locations = response;
            createAllMarkers();

    });

}

//function to get only one location, which was selected
function getLocation(name){
var csrftoken = getCookie('csrftoken');
var data = { location : name, csrfmiddlewaretoken: csrftoken};
    $.post('location/', data, function(response){
            var response = JSON.parse(response);
            FinalFilterAfterLocation(response);
    });

}

//function for posting the wanted location to python
function uploadLocation(name){
var csrftoken = getCookie('csrftoken');
var data = {location : name, csrfmiddlewaretoken: csrftoken};
    $.post('location_information/', data, function(response){
            var boxText = response;
            addInfoBox(boxText);
    });

}

// using jQuery, to get cookie by name
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

//create all markers on the map
function createAllMarkers(){
    //first delete any marker that might be on the map
    DeleteAllMarkers()

    //go through all the locations that were fetched
    for (let i=0;i<all_Locations.length;i++){
        latlngPosition = new google.maps.LatLng(all_Locations[i].lat, all_Locations[i].lng);
        marker = new google.maps.Marker({
                position: latlngPosition,
				map: map,
				draggable: false,
				animation: google.maps.Animation.DROP,
				title: all_Locations[i].name
        });
        //push marker itself and marker name into two global available arrays
        markersNames.push(all_Locations[i].name);
        markers.push(marker);
        //add the click function to the markers
        google.maps.event.addListener(marker,'click',function(){filterAfterLocation(markersNames[i]);});

    }
    //center the map on the middle again
    map.setCenter({lat: 41.247144, lng: -96.016774});
}



//function to load the text for the selected location, will proceed to call the python views.py
function infoBox(nummer){
    switch (nummer){
        case "Denver": uploadLocation("Denver");
                       break;
        case "San Francisco": uploadLocation("San Francisco");
                        break;
        case "Omaha": uploadLocation("Omaha");
                        break;
        case "New York": uploadLocation("New York City");
                        break;
        case "Yosemite": uploadLocation("Yosemite");
                        break;
        case "Yellowstone": uploadLocation("Yellowstone");
                         break;
        case "Route66 SantaMonica": uploadLocation("Santa Monica");
                         break;
        case "Route66 Amarillo": uploadLocation("Amarillo");
                         break;
        default: alert("Default case in the switch for InfoBox!");
       }
}
//function for adding the wikipediaText to the page
function addInfoBox(boxText){
    var mapText = document.getElementById("wikipediaText");
    for (var i=boxText.length;i > 0;i--){
        if (boxText.charAt(i) == "."){
            boxText = boxText.substring(0, i + 1);
            break;
        }
    }
    mapText.innerHTML = boxText;
}

function filterAfterLocation(name){
    var location;
    //test if the function is called by clicking on a marker or on the gallery
    if(name == 'gallery'){
        location = document.getElementsByClassName("jb-idx-thumb jb-thumb-visited jb-thm-thumb-selected");
        location = location[0].childNodes;
        location = location[0].alt;

        //delete all the markers, before one marker is set up as the filtered one
        DeleteAllMarkers();

        //get the data from the selected location
        getLocation(location);
    } else {
        location = name;
        //delete all the markers, before one marker is set up as the filtered one
        DeleteAllMarkers();

        //get the data from the selected location
        getLocation(location);
    }
}

function FinalFilterAfterLocation(markerInfo){
    locationName = markerInfo[0].name;
    markers = [];

    //flo code
    var hook = document.getElementById("cityname")
    hook.innerHTML = locationName
    var placeholder = document.getElementById("weatherplaceholder")
    placeholder.style.display = "none";
    //flo code

    latlngPosition = new google.maps.LatLng(markerInfo[0].lat, markerInfo[0].lng);
    marker = new google.maps.Marker({
        position: latlngPosition,
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        title: locationName
    });
    //push the new marker into the global array
    markers.push(marker);

    //zoom the map
    map.setZoom(11);
    map.setCenter(latlngPosition);
    infowindow = new google.maps.InfoWindow({content: markerInfo[0].description});
    infowindow.open(map, marker);
    //set the text for the wikipedia text
    infoBox(locationName);

    //setting the data for the lng and lat input fields
    getLngLat(locationName);

     //setting the right airportcode for flight and hotel
    getAirportCode(locationName);

    //setting the rank of the location
    updateStars(markerInfo[0].rank);
    document.getElementById("scoreboard").style.display = "block";

}

//function for setting the star ratings
function updateStars(rank){
     switch (rank){
        case "1": document.getElementById("star1").classList.add('checked');
                document.getElementById("star2").classList.remove('checked');
                document.getElementById("star3").classList.remove('checked');
                document.getElementById("star4").classList.remove('checked');
                document.getElementById("star5").classList.remove('checked');
                break;
        case "2": document.getElementById("star1").classList.add('checked');
                document.getElementById("star2").classList.add('checked');
                document.getElementById("star3").classList.remove('checked');
                document.getElementById("star4").classList.remove('checked');
                document.getElementById("star5").classList.remove('checked');
                break;
        case "3": document.getElementById("star1").classList.add('checked');
                document.getElementById("star2").classList.add('checked');
                document.getElementById("star3").classList.add('checked');
                document.getElementById("star4").classList.remove('checked');
                document.getElementById("star5").classList.remove('checked');
                break;
        case "4": document.getElementById("star1").classList.add('checked');
                document.getElementById("star2").classList.add('checked');
                document.getElementById("star3").classList.add('checked');
                document.getElementById("star4").classList.add('checked');
                document.getElementById("star5").classList.remove('checked');
                break;
        case "5": document.getElementById("star1").classList.add('checked');
                document.getElementById("star2").classList.add('checked');
                document.getElementById("star3").classList.add('checked');
                document.getElementById("star4").classList.add('checked');
                document.getElementById("star5").classList.add('checked');
                break;
        default: alert("Default case in the switch for stars ranking!");
       }
}

//function that deletes every marker on the map
function DeleteAllMarkers(){
    for (var i=0;i<markers.length;i++){
        markers[i].setMap(null);
        markers[i] = null;
    }
    markers = [];

    //delete the saved names of markers
    markersNames = [];
}


function denverInfo() {

                    map.setZoom(11);
                    map.setCenter(markers[0].getPosition());
                    infowindowDenver.open(map, markers[0]);
                    infoBox('Denver');
}

function sanfranInfo() {

                    map.setZoom(11);
                    map.setCenter(markers[1].getPosition());
                    infowindowSanFran.open(map, markers[1]);
                    infoBox('San Francisco');
}

function omahaInfo() {

                    map.setZoom(11);
                    map.setCenter(markers[2].getPosition());
                    infowindowOmaha.open(map, markers[2]);
                    infoBox('Omaha');
}

function newYorkInfo() {

                    map.setZoom(11);
                    map.setCenter(markers[3].getPosition());
                    infowindowNewYork.open(map, markers[3]);
                    infoBox('New York');
}

function yosemiteInfo() {

                    map.setZoom(11);
                    map.setCenter(markers[4].getPosition());
                    infowindowYosemite.open(map, markers[4]);
                    infoBox('Yosemite');
}
function yosemiteInfoFiltered() {

                    map.setZoom(11);
                    map.setCenter(markers[0].getPosition());
                    infowindowYosemite.open(map, markers[0]);
                    infoBox('Yosemite');
}

function yellowstoneInfo() {

                    map.setZoom(11);
                    map.setCenter(markers[5].getPosition());
                    infowindowYellowstone.open(map, markers[5]);
                    infoBox('Yellowstone');
}
function yellowstoneInfoFiltered() {

                    map.setZoom(11);
                    map.setCenter(markers[1].getPosition());
                    infowindowYellowstone.open(map, markers[1]);
                    infoBox('Yellowstone');
}

function santaMonicaInfo() {

                    map.setZoom(11);
                    map.setCenter(markers[6].getPosition());
                    infowindowSantaMonica.open(map, markers[6]);
                    infoBox('Route66 SantaMonica');
}

function santaMonicaInfoFiltered() {

                    map.setZoom(11);
                    map.setCenter(markers[0].getPosition());
                    infowindowSantaMonica.open(map, markers[0]);
                    infoBox('Route66 SantaMonica');
}

function amarilloInfo() {

                    map.setZoom(11);
                    map.setCenter(markers[7].getPosition());
                    infowindowAmarillo.open(map, markers[7]);
                    infoBox('Route66 Amarillo');
}
function amarilloInfoFiltered() {

                    map.setZoom(11);
                    map.setCenter(markers[1].getPosition());
                    infowindowAmarillo.open(map, markers[1]);
                    infoBox('Route66 Amarillo');
}

//initialize the map object
function initMap() {

        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 41.247144, lng: -96.016774},
          zoom: 4,
          styles: [

  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ff0000"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text",
    "stylers": [
      {
        "weight": 0.5
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ff0000"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ff0000"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#008040"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#525252"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]

        });

        //start to load the data for the markers
        getLocations()

}