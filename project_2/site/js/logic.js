var map = L.map("map", {
  center: [25, 15],
  zoom: 2.5
});

L.tileLayer("https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(map);

Object.entries(countries_top_5_songs).forEach(country => {
  var coord = country[1]["coord"];
  var top5 = country[1]["top_5"];

  var popup = `
    <h4 align="center">${country[0]}</h4>
    <table class="table table-bordered table-hover table-sm">
      <thead class="thead-light">  
        <tr>
          <th>Artist</th>
          <th>Track Name</th>
          <th>Streams</th>
        </tr>
      </thead>
      <tbody>`;

  top5.forEach(song => {
    popup += `
      <tr>
        <td>${song['artist']}</td>
        <td>${song['track']}</td>
        <td>${song['streams']}</td>
      </tr>`;
  });

  popup += `</tbody></table>`;

  L.marker(coord)
    .bindPopup(popup)
    .addTo(map);
});

var geoJson;

geoJson = L.geoJson(countries_geo_json, {
  onEachFeature: function (feature, layer) {

    // highlight country on mouseover
    layer.on({
      mouseover: function (event) {
        layer = event.target;
        layer.setStyle({
          fillOpacity: 0.9
        });
      },

      // reset style on mouseout
      mouseout: function (event) {
        geoJson.resetStyle(event.target);
      },

      // center country on click
      click: function (event) {
        map.fitBounds(event.target.getBounds());
      }
    });
  }
}).addTo(map);