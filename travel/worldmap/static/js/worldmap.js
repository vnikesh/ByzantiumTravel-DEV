

var all_Locations;

var DenverText;
var DenverString;
var SanFranString;
var OmahaString;
var NewYorkString;
var YosemiteString;
var YellowstoneString;

var infowindowDenver;
var infowindowSanFran;
var infowindowOmaha;
var infowindowNewYork;
var infowindowYosemite;
var infowindowYellowstone;

var latlngDenver;
var latlngSanFran;
var latlngOmaha;
var latlngNewYork;
var latlngYosemite;
var latlngYellowstone;
var latlngSantaMonica;
var latlngAmarillo;

var testText;

var markers = [];
var markersNames = ["Denver", "San Francisco", "Omaha", "New York", "Yosemite", "Yellowstone", "Route66 SantaMonica", "Route66 Amarillor"];
var newMarkersNames = [];
var markersPositions;

//the global map object to point to the google map
var map;

function initiate(){
    DenverString = '<p class="infoWindow">Denver, Capitol of Colorado!</p>';
    SanFranString = '<p class="infoWindow">San Francisco, Tech Base of the US!</p>';
    OmahaString = '<p class="infoWindow">Omaha, Gateway to the West!</p>';
    NewYorkString = '<p class="infoWindow">New York, Big Apple!</p>';
    YosemiteString = '<p class="infoWindow">Yosemite, Best National Park!</p>';
    YellowstoneString = '<p class="infoWindow">Yellowstone, Wyomings Treasure!</p>';
    SantaMonicaString = '<p class="infoWindow">Santa Monica, End of Route 66!</p>';
    AmarilloString = '<p class="infoWindow">Amarillo, Mid of Route 66!</p>';

    infowindowDenver = new google.maps.InfoWindow({content: DenverString});
    infowindowSanFran = new google.maps.InfoWindow({content: SanFranString});
    infowindowOmaha = new google.maps.InfoWindow({content: OmahaString});
    infowindowNewYork = new google.maps.InfoWindow({content: NewYorkString});
    infowindowYosemite = new google.maps.InfoWindow({content: YosemiteString});
    infowindowYellowstone = new google.maps.InfoWindow({content: YellowstoneString});
    infowindowSantaMonica = new google.maps.InfoWindow({content: SantaMonicaString});
    infowindowAmarillo = new google.maps.InfoWindow({content: AmarilloString});

    latlngDenver = new google.maps.LatLng(39.777128, -104.989211);
    latlngSanFran = new google.maps.LatLng(37.77105,  -122.423851);
    latlngOmaha = new google.maps.LatLng(41.256537, -95.934503);
    latlngNewYork = new google.maps.LatLng(40.712775, -74.005973);
    latlngYosemite = new google.maps.LatLng(37.865101, -119.538329);
    latlngYellowstone = new google.maps.LatLng(44.427963, -110.588455);
    latlngSantaMonica = new google.maps.LatLng(34.019454, -118.491191);
    latlngAmarillo = new google.maps.LatLng(35.221997, -101.831297);

    markersPositions = [latlngDenver, latlngSanFran, latlngOmaha, latlngNewYork, latlngYosemite, latlngYellowstone, latlngSantaMonica, latlngAmarillo];
}

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
    markers = [];
    newMarkersNames = [];
    //go through all teh locations that were fetched
    for (var i=0;i<all_Locations.length;i++){
        latlngPosition = new google.maps.LatLng(all_Locations[i].lat, all_Locations[i].lng);
        marker = new google.maps.Marker({
                position: latlngPosition,
				map: map,
				draggable: false,
				animation: google.maps.Animation.DROP,
				title: all_Locations[i].name
        });
        name = all_Locations[i].name;
        google.maps.event.addListener(marker,'click',function(){filterAfterLocation(name);});
        markers.push(marker);
        newMarkersNames.push(all_Locations[i].name);
    }

    /*google.maps.event.addListener(markers[0],'click',function(){filterAfterLocation();});
    google.maps.event.addListener(markers[1],'click',function(){sanfranInfo();});
    google.maps.event.addListener(markers[2],'click',function(){omahaInfo();});
    google.maps.event.addListener(markers[3],'click',function(){newYorkInfo();});
    google.maps.event.addListener(markers[4],'click',function(){yosemiteInfo();});
    google.maps.event.addListener(markers[5],'click',function(){yellowstoneInfo();});
    google.maps.event.addListener(markers[6],'click',function(){santaMonicaInfo();});
    google.maps.event.addListener(markers[7],'click',function(){amarilloInfo();});*/
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
        case "New York": uploadLocation("New York");
                        break;
        case "Yosemite": uploadLocation("Yosemite");
                        break;
        case "Yellowstone": uploadLocation("Yellowstone");
                         break;
        case "Route66 SantaMonica": uploadLocation("Santa Monica");
                         break;
        case "Route66 Amarillo": uploadLocation("Amarillo");
                         break;
        default: alert("Default Anweisung in der switch Anweisung for InfoBox!");
       }
}

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
    newMarkersNames = [];

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

    markers.push(marker);
    newMarkersNames.push(locationName);

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

}

function DeleteAllMarkers(){
    for (var i=0;i<markers.length;i++){
        markers[i].setMap(null);
        markers[i] = null;
    }
    markers = [];
}

function NatureMarkers(){
    DeleteAllMarkers();

    markerYosemite = new google.maps.Marker({
                position: markersPositions[4],
				map: map,
				draggable: false,
				animation: google.maps.Animation.DROP,
				title: markersNames[4]
        });
    markers.push(markerYosemite);

    markerYellowstone = new google.maps.Marker({
                position: markersPositions[5],
				map: map,
				draggable: false,
				animation: google.maps.Animation.DROP,
				title: markersNames[5]
        });
    markers.push(markerYellowstone);
        google.maps.event.addListener(markers[0],'click',function(){yosemiteInfoFiltered();});
        google.maps.event.addListener(markers[1],'click',function(){yellowstoneInfoFiltered();});
}

function cityMarkers(){
    DeleteAllMarkers();

    markerDenver = new google.maps.Marker({
                position: markersPositions[0],
				map: map,
				draggable: false,
				animation: google.maps.Animation.DROP,
				title: markersNames[0]
        });
    markers.push(markerDenver);

    markerSanFran = new google.maps.Marker({
                position: markersPositions[1],
				map: map,
				draggable: false,
				animation: google.maps.Animation.DROP,
				title: markersNames[1]
        });
    markers.push(markerSanFran);
    markerOmaha = new google.maps.Marker({
                position: markersPositions[2],
				map: map,
				draggable: false,
				animation: google.maps.Animation.DROP,
				title: markersNames[2]
        });
    markers.push(markerOmaha);

    markerNewYork = new google.maps.Marker({
                position: markersPositions[3],
				map: map,
				draggable: false,
				animation: google.maps.Animation.DROP,
				title: markersNames[3]
        });
    markers.push(markerNewYork);
    google.maps.event.addListener(markers[0],'click',function(){denverInfo();});
        google.maps.event.addListener(markers[1],'click',function(){sanfranInfo();});
        google.maps.event.addListener(markers[2],'click',function(){omahaInfo();});
        google.maps.event.addListener(markers[3],'click',function(){newYorkInfo();});
}

function RoadMarkers(){
    DeleteAllMarkers();

    markerSanta = new google.maps.Marker({
                position: markersPositions[6],
				map: map,
				draggable: false,
				animation: google.maps.Animation.DROP,
				title: markersNames[6]
        });
    markers.push(markerSanta);

    markerAma = new google.maps.Marker({
                position: markersPositions[7],
				map: map,
				draggable: false,
				animation: google.maps.Animation.DROP,
				title: markersNames[7]
        });
    markers.push(markerAma);
    google.maps.event.addListener(markers[0],'click',function(){santaMonicaInfoFiltered();});
        google.maps.event.addListener(markers[1],'click',function(){amarilloInfoFiltered();});
}

function AllMarkers(){
    //first delete all markers
    DeleteAllMarkers();
    //then reload every marker, starting with fetching the marker data
    getLocations();
    //center the map on the middle again
    map.setCenter({lat: 41.247144, lng: -96.016774});
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
        initiate();

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