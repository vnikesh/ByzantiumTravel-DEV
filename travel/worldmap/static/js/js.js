//functions for filtering the locations byu category
function displayCategory (category) {
    switch (category) {
        case 'Nature':
            changeScriptToNature();
            new juicebox({
                baseUrl : '/static/images/galleryNature/',
                containerId : "juicebox-container",
                galleryWidth: "100%",
                galleryHeight: "100%",
                backgroundColor: "#222222"
              });
        break;
        case 'Citytrip':
            changeScriptToCity();
            new juicebox({
                baseUrl : '/static/images/galleryCity/',
                containerId : "juicebox-container",
                galleryWidth: "100%",
                galleryHeight: "100%",
                backgroundColor: "#222222"
              });
        break;
        case 'Road':
            changeScriptToRoad();
            new juicebox({
                baseUrl : '/static/images/galleryRoads/',
                containerId : "juicebox-container",
                galleryWidth: "100%",
                galleryHeight: "100%",
                backgroundColor: "#222222"
              });
        break;
        default:
        alert ("Category doesn't exist");

    }
}

function changeScriptToNature(){
    var src = '/static/images/galleryNature/jbcore/juicebox.js';
    var headElements = document.getElementsByTagName("head")[0].children;
    var found = 0
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
    var found = 0
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
    var found = 0
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