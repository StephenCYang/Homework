var access_token="pk.eyJ1Ijoic3RlcGhlbnkxOTY4IiwiYSI6ImNrYzE4YzBkZTA3dXgycm9hZjdmb25pcGMifQ.dgY0msQFH35rFJ6wF5d41Q"
var mapBox = "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=" + access_token;
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var platesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

d3.json(queryUrl, function(data) {

  d3.json(platesUrl, function(plates_data) {

    createFeatures(data.features, plates_data.features);
  });
});

function createFeatures(earthquakeData, platesData) {

  var latitude = [];
  var longitude = [];
  var markers = [];

  for (var i=0; i<earthquakeData.length; i++) {
    var magnitude = earthquakeData[i]["properties"]["mag"];
    var location = earthquakeData[i]["properties"]["place"];
      

    if (magnitude < 1) {
      markers.push(
      L.circle([earthquakeData[i]["geometry"]["coordinates"][1], earthquakeData[i]["geometry"]["coordinates"][0]], 
      {fillColor: "green",
      stroke: false,
      fillOpacity: 0.5,
      radius: (magnitude * 50) + 20000})
      .bindPopup("<h4>" + location + "<br>Magnitude" + magnitude)
      );
    }

    else if (magnitude >=1 && magnitude < 2) {
      markers.push(
        L.circle([earthquakeData[i]["geometry"]["coordinates"][1], earthquakeData[i]["geometry"]["coordinates"][0]],
        {fillColor: "lightgreen",
        stroke: false,
        fillOpacity: 0.5,
        radius: (magnitude * 50) + 40000})
        .bindPopup("<h4>" + location + "<br>Magnitude" + magnitude)
      );
    }

    else if (magnitude >=2 && magnitude < 3) {
      markers.push(
        L.circle([earthquakeData[i]["geometry"]["coordinates"][1], earthquakeData[i]["geometry"]["coordinates"][0]],
        {fillColor: "yellow",
        stroke: false,
        fillOpacity: 0.5,
        radius: (magnitude * 50) + 60000})
        .bindPopup("<h4>" + location + "<br>Magnitude" + magnitude)
      );
    }

    else if (magnitude >=3 && magnitude < 4) {
      markers.push(
        L.circle([earthquakeData[i]["geometry"]["coordinates"][1], earthquakeData[i]["geometry"]["coordinates"][0]], 
        {fillColor: "orange",
        stroke: false,
        fillOpacity: 0.5,
        radius: (magnitude * 30) + 80000})
        .bindPopup("<h4>" + location + "<br>Magnitude" + magnitude)
      );
    }

    else if (magnitude >=4 && magnitude < 5) {
      markers.push(
        L.circle([earthquakeData[i]["geometry"]["coordinates"][1], earthquakeData[i]["geometry"]["coordinates"][0]],
        {fillColor: "darkorange",
        stroke: false,
        fillOpacity: 0.5,
        radius: (magnitude * 50) + 100000})
        .bindPopup("<h4>" + location + "<br>Magnitude" + magnitude)
      );
    }

    else if (magnitude >=5) {
      markers.push(
        L.circle([earthquakeData[i]["geometry"]["coordinates"][1], earthquakeData[i]["geometry"]["coordinates"][0]],
        {fillColor: "red",
        stroke: false,
        fillOpacity: 0.5,
        radius: (magnitude * 50) + 120000})
        .bindPopup("<h4>" + location + "<br>Magnitude" + magnitude)
      );
    }
  }

  var earthquakes = L.layerGroup(markers);

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=" + access_token);
  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=" + access_token);
  var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=" + access_token);
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=" + access_token);
  

  // Define plates layer
  var faultLines = {
    "fillColor": "orange",
    "weight": 2,
    "color": "orange",
    "fillOpacity": 0
  }

  platesData = L.geoJSON(platesData, {style: faultLines});


  var baseMaps = {
      "Satellite": satellitemap,
      "Grayscale": lightmap,
      "Outdoors": streetmap
  };

  var overlayMaps = {
      Earthquakes: earthquakes,
      Faultlines: platesData
  };

  var myMap = L.map("map", {
    center: [33.6846, -117.8265], //Irvine!!
    zoom: 3,
    layers: [satellitemap, earthquakes, platesData]
  });

  L.tileLayer(mapBox).addTo(myMap);

  // Create a layer control
  L.control
      .layers(baseMaps, overlayMaps, {
          collapsed: false
      }).addTo(myMap);

// ripped off from https://leafletjs.com/examples/choropleth/
      function getColor(data) {
        // using ? is a shorter way of saying an if statement
        // basically, if the magnitude is less than that number, give it that color.
        return data < 1 ? "green":
               data < 2 ? "yellowgreen":
               data < 3 ? "yellow":
               data < 4 ? "orange":
               data < 5 ? "darkorange":
                          "red";
      }
    
// also ripped off from https://leafletjs.com/examples/choropleth/      
      var magnitudeLegend = L.control({position: "bottomright"});
    
      magnitudeLegend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'magnitude legend'),
          magScale = [0, 1, 2, 3, 4, 5],
          magnitudeLabels = [];
    
          for (var i=0; i<magScale.length; i++) {
            div.innerHTML += '<i style="background:' + getColor(magScale[i]) + '"></i>' + 
                              magScale[i] + (magScale[i+1] ? '&ndash;' + magScale[i+1] + '<br>' : '+'); 
          }
    
          return div;
      };
    
      magnitudeLegend.addTo(myMap);
}
