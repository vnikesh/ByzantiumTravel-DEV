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
              NatureMarkers();
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
              cityMarkers();
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
              RoadMarkers();
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
              AllMarkers();
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
           document.getElementById('hprice1').innerHTML = json.results[0].total_price[amount]
           document.getElementById('roomtype1').innerHTML = json.results[0].rooms[0].room_type_info[room_type]

           document.getElementById('propertyname2').innerHTML = json.results[1].property_name
           document.getElementById('contact2').innerHTML = json.results[1].contacts[0].detail
           document.getElementById('hprice2').innerHTML = json.results[1].total_price[amount]
           document.getElementById('roomtype2').innerHTML = json.results[1].rooms[0].room_type_info[room_type]

           document.getElementById('propertyname3').innerHTML = json.results[2].property_name
           document.getElementById('contact3').innerHTML = json.results[1].contacts[0].detail
           document.getElementById('hprice3').innerHTML = json.results[1].total_price[amount]
           document.getElementById('roomtype3').innerHTML = json.results[1].rooms[0].room_type_info[room_type]

        });
        e.preventDefault();
    });
});