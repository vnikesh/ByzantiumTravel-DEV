//functions for filtering the locations byu category
function displayCategory (category) {
    switch (category) {
        case 'Nature':
            changeScriptToNature();
            new juicebox({
                baseUrl : '/static/images/galleryNature/',
                containerId : "juicebox-container",
                galleryWidth: "90%",
                galleryHeight: "80%",
                backgroundColor: "transparent"
              });
              getLocationsByType('Nature');
        break;
        case 'Citytrip':
            changeScriptToCity();
            new juicebox({
                baseUrl : '/static/images/galleryCity/',
                containerId : "juicebox-container",
                galleryWidth: "90%",
                galleryHeight: "80%",
                backgroundColor: "transparent"
              });
              getLocationsByType('City');
        break;
        case 'Road':
            changeScriptToRoad();
            new juicebox({
                baseUrl : '/static/images/galleryRoads/',
                containerId : "juicebox-container",
                galleryWidth: "90%",
                galleryHeight: "80%",
                backgroundColor: "transparent"
              });
              getLocationsByType('Road');
        break;
        case 'All':
        changeScriptToAll();
        new juicebox({
                baseUrl : '/static/images/galleryAll/',
                containerId : "juicebox-container",
                galleryWidth: "90%",
                galleryHeight: "80%",
                backgroundColor: "transparent"
              });
              getLocations();
         break;
        default:
        alert ("Category doesn't exist");

    }
}

function changeScriptToNature(){
    var src = '/static/images/galleryNature/jbcore/juicebox.js';
    var headElements = document.getElementsByTagName("head")[0].children;
    var found = 0;
     for(var i = 0; i < headElements.length; i++) {
        if(headElements[i].tagName == 'SCRIPT') {
               src_name = headElements[i].src;
               if(src_name.search("galleryAll") > 0 && found == 0){
                 found++;
                 headElements[i].src = src;
               } else if (src_name.search("galleryCity") > 0 && found == 0){
                 found++;
                 headElements[i].src = src;
               } else if (src_name.search("galleryRoads") > 0 && found == 0){
                 found++;
                 headElements[i].src = src;
               }

         }
      }
}

function changeScriptToCity(){
    var src = '/static/images/galleryCity/jbcore/juicebox.js';
    var headElements = document.getElementsByTagName("head")[0].children;
    var found = 0;
     for(var i = 0; i < headElements.length; i++) {
        if(headElements[i].tagName == 'SCRIPT') {
               src_name = headElements[i].src;
               if(src_name.search("galleryAll") > 0 && found == 0){
                 found++;
                 headElements[i].src = src;
               } else if (src_name.search("galleryNature") > 0 && found == 0){
                 found++;
                 headElements[i].src = src;
               } else if (src_name.search("galleryRoads") > 0 && found == 0){
                 found++;
                 headElements[i].src = src;
               }

         }
      }
}

function changeScriptToRoad(){
    var src = '/static/images/galleryRoads/jbcore/juicebox.js';
    var headElements = document.getElementsByTagName("head")[0].children;
    var found = 0;
     for(var i = 0; i < headElements.length; i++) {
        if(headElements[i].tagName == 'SCRIPT') {
               src_name = headElements[i].src;
               if(src_name.search("galleryAll") > 0 && found == 0){
                 found++;
                 headElements[i].src = src;
               } else if (src_name.search("galleryNature") > 0 && found == 0){
                 found++;
                 headElements[i].src = src;
               } else if (src_name.search("galleryCity") > 0 && found == 0){
                 found++;
                 headElements[i].src = src;
               }

         }
      }
}

function changeScriptToAll(){
    var src = '/static/images/galleryAll/jbcore/juicebox.js';
    var headElements = document.getElementsByTagName("head")[0].children;
    var found = 0;
     for(var i = 0; i < headElements.length; i++) {
        if(headElements[i].tagName == 'SCRIPT') {
               src_name = headElements[i].src;
               if(src_name.search("galleryRoads") > 0 && found == 0){
                 found++;
                 headElements[i].src = src;
               } else if (src_name.search("galleryNature") > 0 && found == 0){
                 found++;
                 headElements[i].src = src;
               } else if (src_name.search("galleryCity") > 0 && found == 0){
                 found++;
                 headElements[i].src = src;
               }

         }
      }
}
$(document).ready(function() {
    $('#FlightForm').submit(function(e){
        $.post('/getFlights/', $(this).serialize(), function(data){
            var json = JSON.parse(data);
           if (json.results == undefined){
                document.getElementById('departDate1').innerHTML = ''
               document.getElementById('returnDate1').innerHTML = ''
               document.getElementById('price1').innerHTML = ''
               document.getElementById('airline1').innerHTML = ''

               document.getElementById('departDate2').innerHTML = ''
               document.getElementById('returnDate2').innerHTML = ''
               document.getElementById('price2').innerHTML = ''
               document.getElementById('airline2').innerHTML = ''

               document.getElementById('departDate3').innerHTML = ''
               document.getElementById('returnDate3').innerHTML = ''
               document.getElementById('price3').innerHTML = ''
               document.getElementById('airline3').innerHTML = ''
           } else {
               document.getElementById('departDate1').innerHTML = json.results[0].departure_date
               document.getElementById('returnDate1').innerHTML = json.results[0].return_date
               document.getElementById('price1').innerHTML = json.results[0].price
               document.getElementById('airline1').innerHTML = json.results[0].airline

               document.getElementById('departDate2').innerHTML = json.results[1].departure_date
               document.getElementById('returnDate2').innerHTML = json.results[1].return_date
               document.getElementById('price2').innerHTML = json.results[1].price
               document.getElementById('airline2').innerHTML = json.results[1].airline

               document.getElementById('departDate3').innerHTML = json.results[2].departure_date
               document.getElementById('returnDate3').innerHTML = json.results[2].return_date
               document.getElementById('price3').innerHTML = json.results[2].price
               document.getElementById('airline3').innerHTML = json.results[2].airline
           }

        });
        e.preventDefault();
    });
});


$(document).ready(function() {
    $('#HotelForm').submit(function(e){
        $.post('/getHotels/', $(this).serialize(), function(data1){
            var json = JSON.parse(data1);

           document.getElementById('propertyname1').innerHTML = json.results[0].property_name
           document.getElementById('contact1').innerHTML = json.results[0].contacts[0].detail
            document.getElementById('dprice1').innerHTML = json.results[0]['min_daily_rate']['amount']
           document.getElementById('tprice1').innerHTML = json.results[0]['total_price']['amount']
           document.getElementById('roomtype1').innerHTML = json.results[0].rooms[0].descriptions

           document.getElementById('propertyname2').innerHTML = json.results[1].property_name
           document.getElementById('contact2').innerHTML = json.results[1].contacts[0].detail
           document.getElementById('dprice2').innerHTML = json.results[1]['min_daily_rate']['amount']
           document.getElementById('tprice2').innerHTML = json.results[1]['total_price']['amount']
           document.getElementById('roomtype2').innerHTML = json.results[1].rooms[0].descriptions

           document.getElementById('propertyname3').innerHTML = json.results[2].property_name
           document.getElementById('contact3').innerHTML = json.results[2].contacts[0].detail
           document.getElementById('dprice3').innerHTML = json.results[2]['min_daily_rate']['amount']
           document.getElementById('tprice3').innerHTML = json.results[2]['total_price']['amount']
           document.getElementById('roomtype3').innerHTML = json.results[2].rooms[0].descriptions

        });
        e.preventDefault();
    });
});


$(document).ready(function() {
    $('#ZomatoForm').submit(function(e){
        $.post('/getZomato/', $(this).serialize(), function(data2){
            var json = JSON.parse(data2);

           document.getElementById('restaraunt1').innerHTML = json.restaurants[0]['restaurant']['name']
           document.getElementById('cuisine1').innerHTML = json.restaurants[0]['restaurant']['cuisines']
           document.getElementById('avg1').innerHTML = json.restaurants[0]['restaurant']['average_cost_for_two']
           document.getElementById('rating1').innerHTML = json.restaurants[0]['restaurant']['user_rating']['aggregate_rating']
           var menu1 = document.getElementById('menu1')
           menu1.setAttribute("href", json.restaurants[0]['restaurant']['menu_url'] )

           document.getElementById('restaraunt2').innerHTML = json.restaurants[1]['restaurant']['name']
           document.getElementById('cuisine2').innerHTML = json.restaurants[1]['restaurant']['cuisines']
           document.getElementById('avg2').innerHTML = json.restaurants[1]['restaurant']['average_cost_for_two']
           document.getElementById('rating2').innerHTML = json.restaurants[1]['restaurant']['user_rating']['aggregate_rating']
           var menu2 = document.getElementById('menu2')
           menu2.setAttribute("href", json.restaurants[1]['restaurant']['menu_url'] )

           document.getElementById('restaraunt3').innerHTML = json.restaurants[2]['restaurant']['name']
           document.getElementById('cuisine3').innerHTML = json.restaurants[2]['restaurant']['cuisines']
           document.getElementById('avg3').innerHTML = json.restaurants[2]['restaurant']['average_cost_for_two']
           document.getElementById('rating3').innerHTML = json.restaurants[2]['restaurant']['user_rating']['aggregate_rating']
           var menu3 = document.getElementById('menu3')
           menu3.setAttribute("href", json.restaurants[2]['restaurant']['menu_url'] )
        });
        e.preventDefault();
    });
});
function showRestaurants(){
  var x = document.getElementById("restaurantResults")
  x.style.visibility ="visible";
}
function showFlights(){
  var x = document.getElementById("flightResults")
  x.style.visibility ="visible";
}
function showHotels(){
  var x = document.getElementById("hotelResults")
  x.style.visibility ="visible";
}
