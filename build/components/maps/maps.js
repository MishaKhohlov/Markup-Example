export default class {
  constructor(lat, lng, zoom, location, content) {
    this.lat = lat;
    this.lng = lng;
    this.zoom = zoom;
    this.location = location;
    this.content = content;
  }

  init() {
    function mapsInit() {
      let placeObj = {lat: this.lat, lng: this.lng};
      let map = new google.maps.Map(document.getElementById('map'), {
        center: placeObj,
        zoom: this.zoom
      });

      let marker = new google.maps.Marker({
        map: map,
        place: {
          location: placeObj,
          query: this.location
        },
        attribution: {
          source: 'Google Maps JavaScript API',
          webUrl: 'https://developers.google.com/maps/'
        }
      });

      let infoWindow = new google.maps.InfoWindow({
        content: this.content
      });

      marker.addListener('click', function () {
        infoWindow.open(map, marker);
      });
    }
    if(typeof google !== 'undefined') {
      mapsInit.call(this);
    }
  }
}
