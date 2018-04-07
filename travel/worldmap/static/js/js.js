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
           alert(data);
           alert(json.currency);
           alert(json.results[0]);
           // of course you can do something more fancy with your respone
        });
        e.preventDefault();
    });
});