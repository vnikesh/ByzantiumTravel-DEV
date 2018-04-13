
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

var imgDenver;

var testText;

var markers = [];
var markersNames = ["Denver", "San Francisco", "Omaha", "New York", "Yosemite", "Yellowstone", "Route66 SantaMonica", "Route66 Amarillor"];
var markersPositions;

var map;

function initiate(){
DenverString = '<p class="infoWindow">Denver, Capitol of Colorado!</p>';
SanFranString = '<p class="infoWindow">San Francisco, Tech Base of the US!</p>';
OmahaString = '<p class="infoWindow">Denver, Gateway to the West!</p>';
NewYorkString = '<p class="infoWindow">Denver, Big Apple!</p>';
YosemiteString = '<p class="infoWindow">Denver, Best National Park!</p>';
YellowstoneString = '<p class="infoWindow">Denver, Wyomings Treasure!</p>';

infowindowDenver = new google.maps.InfoWindow({content: DenverString});
infowindowSanFran = new google.maps.InfoWindow({content: SanFranString});
infowindowOmaha = new google.maps.InfoWindow({content: OmahaString});
infowindowNewYork = new google.maps.InfoWindow({content: NewYorkString});
infowindowYosemite = new google.maps.InfoWindow({content: YosemiteString});
infowindowYellowstone = new google.maps.InfoWindow({content: YellowstoneString});

latlngDenver = new google.maps.LatLng(39.777128, -104.989211);
latlngSanFran = new google.maps.LatLng(37.77105,  -122.423851);
latlngOmaha = new google.maps.LatLng(41.256537, -95.934503);
latlngNewYork = new google.maps.LatLng(40.712775, -74.005973);
latlngYosemite = new google.maps.LatLng(37.865101, -119.538329);
latlngYellowstone = new google.maps.LatLng(44.427963, -110.588455);
latlngSantaMonica = new google.maps.LatLng(34.019454, -118.491191);
latlngAmarillo = new google.maps.LatLng(35.221997, -101.831297);

markersPositions = [latlngDenver, latlngSanFran, latlngOmaha, latlngNewYork, latlngYosemite, latlngYellowstone, latlngSantaMonica, latlngAmarillo];

imgDenver = document.createElement('img');
imgDenver.src = "/static/images/Denver.JPG";
imgDenver.setAttribute("id", "imageInfoBox");

}



//function for posting the wanted location to python
function uploadLocation(name){
var csrftoken = getCookie('csrftoken');
var data = {location : name, csrfmiddlewaretoken: csrftoken};
    $.post('location_information/', data, function(response){
            var boxText = response;
            var boxImage = imgDenver;
            addInfoBox(boxText, boxImage);
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
    for (var i=0;i<markersNames.length;i++){
        marker = new google.maps.Marker({
                position: markersPositions[i],
				map: map,
				draggable: false,
				animation: google.maps.Animation.DROP,
				title: markersNames[i]
        });
        markers.push(marker);
    }
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

        createAllMarkers();
        //alert(markers[0]);

        google.maps.event.addListener(markers[0],'click',function() {

                    map.setZoom(11);
                    map.setCenter(markerDenver.getPosition());
                    infowindowDenver.open(map, markerDenver);
                    infoBox('denver');
                    });



}

function infoBox(nummer){
    switch (nummer){
        case "denver": uploadLocation("Denver");
                       break;
        case "sanfran": uploadLocation("San Francisco");
                        break;

       case "omaha": uploadLocation("Omaha");
                     break;
     case "newyork": uploadLocation("New York");
     break;
     case "yosemite": uploadLocation("Yosemite");
     break;
     case "yellowstone": uploadLocation("Yellowstone");
     break;
     case "santaMonica": uploadLocation("Santa Monica");
     break;
     case "amarillo": uploadLocation("Amarillo");
     break;

     default: alert("Default Anweisung in der switch Anweisung!");
       }
}

function addInfoBox(boxText, boxImage){
    var mapText = document.getElementById("mapText");
    mapText.innerHTML = boxText;
}

function filterAfterLocation(){
   var location = document.getElementsByClassName("jb-idx-thumb jb-thumb-visited jb-thm-thumb-selected");
    //alert(location.length);
    location = location[0].childNodes;
    location = location[0].alt;
    DeleteAllMarkers();
    var hook = document.getElementById("cityname")
    hook.innerHTML = location
    var placeholder = document.getElementById("weatherplaceholder")
    placeholder.style.display = "none";
    for (var i = 0; i < markersNames.length; i++) {
            if (markersNames[i] == location){
            marker = new google.maps.Marker({
                position: markersPositions[i],
				map: map,
				draggable: false,
				animation: google.maps.Animation.DROP,
				title: markersNames[i]
            });
            markers.push(marker);
            } else {
            //do nothing
            }
        }


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

}

function AllMarkers(){
    DeleteAllMarkers();
    createAllMarkers();
    map.setCenter({lat: 41.247144, lng: -96.016774});
}
