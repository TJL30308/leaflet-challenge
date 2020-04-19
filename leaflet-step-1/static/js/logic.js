
var myMap = L.map("map", {
    center: [39.50, -98.35],
    zoom: 2
  });
  

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 13,
    id: "mapbox.light",
    accessToken: API_KEY,
  }).addTo(myMap);
 
var earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

function createMarkers(data){

  console.log(data);

  var locations = data.features;

  for (var i=0; i<locations.length; i++){

    var location = data.features[i].geometry;

    var lat = location.coordinates[1];
    var lng = location.coordinates[0];
    var mag = data.features[i].properties.mag;
    var place = data.features[i].properties.place;

    function getColor(d) {
      return d >= 5 ? '#880000' : 
        d >= 4 ? '#FF2B2B' : 
        d >= 3 ? '#FF5252' :
        d >= 2 ? '#FD8E8E' :
        d>= 1 ? '#FFE0E0' : 
        '#FFFFFF';
    }

    L.circle([lat, lng], { 
      stroke: false,
      color: getColor(mag),
      fill: getColor(mag),
      fillOpacity: 0.75,
      radius: mag * 50000
    }).bindPopup("<h4> Location: " + place + "</h4>" + "<p> Magnitude: " + mag + "</p>").addTo(myMap);

  };

};

d3.json(earthquakeURL, createMarkers);
