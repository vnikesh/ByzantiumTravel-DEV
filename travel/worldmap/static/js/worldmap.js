
var DenverText;

var DenverString;

var infowindowDenver;

var imgDenver;

var testText

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

//initialize the map object
function initMap() {
      initiate();
      var map;
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 41.247144, lng: -96.016774},
          zoom: 4
        });

        var latlngDenver = new google.maps.LatLng(39.777128, -104.989211);
        var latlngSanFran = new google.maps.LatLng(37.77105,  -122.423851);
        var latlngOmaha = new google.maps.LatLng(41.256537, -95.934503);
        var latlngNewYork = new google.maps.LatLng(40.712775, -74.005973);
        var latlngYosemite = new google.maps.LatLng(37.865101, -119.538329);
        var latlngYellowstone = new google.maps.LatLng(44.427963, -110.588455);

        var markerDenver = new google.maps.Marker(
			{
				position: latlngDenver,
				map: map,
				draggable: false,
				animation: google.maps.Animation.DROP,
				title: 'Denver'
			});

			var markerSanFran = new google.maps.Marker(
			{
				position: latlngSanFran,
				map: map,
				draggable: false,
				animation: google.maps.Animation.DROP,
				title: 'San Francisco'
			});

			var markerOmaha = new google.maps.Marker(
			{
				position: latlngOmaha,
				map: map,
				draggable: false,
				animation: google.maps.Animation.DROP,
				title: 'Omaha'
			});

			var markerNewYork = new google.maps.Marker(
			{
				position: latlngNewYork,
				map: map,
				draggable: false,
				animation: google.maps.Animation.DROP,
				title: 'New York'
			});

			var markerYosemite = new google.maps.Marker(
			{
				position: latlngYosemite,
				map: map,
				draggable: false,
				animation: google.maps.Animation.DROP,
				title: 'Yosemite'
			});

			var markerYellowstone = new google.maps.Marker(
			{
				position: latlngYellowstone,
				map: map,
				draggable: false,
				animation: google.maps.Animation.DROP,
				title: 'Yellowstone'
			});

			google.maps.event.addListener(markerDenver,'click',function() {
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

       default: alert("Default Anweisung in der switch Anweisung!");
       }
}

function addInfoBox(boxText, boxImage){
    var mapText = document.getElementById("mapText");
    mapText.innerHTML = boxText;
}

function filterAfterLocation(){



}