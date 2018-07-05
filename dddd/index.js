

function initMap(){
    var options={
      zoom:15,
      center:{lat:52.62783,lng:-1.29834}
    }


    var map = new google.maps.Map(document.getElementById('map'),options);


    fetch('markers.json')
      .then(function(response){return response.json()})
      .then(plotMarkers);

  var markers;
  var bounds;

  function plotMarkers(m)
  {
    markers =[];
    bounds= new google.maps.LatLngBounds();

    m.forEach(function (marker){
      var position = new google.maps.LatLng(marker.lat, marker.lng);

      markers.push(
        new google.maps.Marker({
          position: position,
          map:map,
          animation: google.maps.Animation.DROP

        })
      );
      bounds.extend(position);
    });
    map.fitBounds(bounds);
  }

/*  var position = new google.maps.LatLng(this.lat, this.lng);

  markers.push(
    new google.maps.Marker({
      position: position,
      map:
    })
  )*/

    map.addListener('click', function(e) {
    placeMarker(e.latLng, map);
    markers.push(e.latLng, map);

    });
const fs = require('fs');
var data;
function placeMarker(position, map) {

    var marker = new google.maps.Marker({
        position: position,
        map: map
    });
    let data = JSON.stringfy(marker);


    map.panTo(position);
    fs.writeFile('markers.json',data, 'utf8', function(err){
      if(err){
        return console.log(err);

      }
      console.log("saved");
    });
}


    /*var marker = new google.maps.Marker({
      position:{lat:42.4668,lng:-70.9495},
      map:map,
      //icon:'http://www.iconninja.com/files/550/848/898/animal-frog-icon.png'
      draggable:true
    });*/
}
