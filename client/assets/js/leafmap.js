//mapbox
    var coordsLng = document.getElementById("maptiles").getAttribute("data-coordsLng")
    var coordsLat = document.getElementById("maptiles").getAttribute("data-coordsLat")

   
    // var mapOptions ={
    //     center: (coordsLat, coordsLng),
    //     zoom : 10
    // }
    // var mymap = L.map('mapid', mapOptions) 
    // L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    // maxZoom: 18,
    // tileSize: 512,
    // zoomOffset: -1,
    // id: 'mapbox/streets-v11',
    // accessToken: 'pk.eyJ1IjoidXRha2F0byIsImEiOiJja3QwNGpweDQyempkMndvZDQ2cTZoYTVxIn0.QPmGyuX7QruYIy_E_eBZRw'
    // }).addTo(mymap);

//thunderforest

    var map = new L.Map('mapid', {
        center: new L.LatLng(coordsLat, coordsLng),
        zoom: 15
      });
      
    //   create a new tile layer
      var tileUrl = "https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=24fc68c14528438392de6dbf91ddefc0"
      layer = new L.TileLayer(tileUrl, {maxZoom: 18})
      .on('tileloadstart', function(event) {
        event.tile.setAttribute('loading', 'lazy');
    });

      // add the layer to the map
      map.addLayer(layer);
      L.circle([coordsLat, coordsLng], {radius : 150}).addTo(map);

      // disable interactions

      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
      if (map.tap) map.tap.disable();

