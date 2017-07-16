// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow;
function initMap() {
  var myLatLng = {lat: 33.126856, lng: -117.267138};
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 17
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var star = {
        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor: 'blue',
        fillOpacity: 0.8,
        scale: 0.1,
        strokeColor: 'blue',
        strokeWeight: 3
      };

      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: star,
        title: 'Click to reserve!'
      });

      var anotherMarker = new google.maps.Marker({
      position: map.getCenter(),
      icon: {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 3
      },
      draggable: true,
      map: map
      });

      // infoWindow.setPosition(pos);
      // infoWindow.setContent('You are here');
      // infoWindow.open(map);

      marker.addListener('click', function() {
        window.confirm("sometext");
      });

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
