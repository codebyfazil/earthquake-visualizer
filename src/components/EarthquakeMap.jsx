import { useEffect } from "react";
import * as d3 from "d3";
import L from "leaflet";

export default function EarthquakeMap() {
useEffect(() => {
  // FIX — avoid "map already initialized" error
  const mapContainer = L.DomUtil.get("map");
  if (mapContainer != null) {
    mapContainer._leaflet_id = null;
  }

  const map = L.map("map", {
    center: [40.7, -94.5],
    zoom: 3,
  });

    // Tile Layers
    const streets = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      { maxZoom: 18 }
    );

    const satellite = L.tileLayer(
      "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=YOUR_MAPBOX_KEY",
      { maxZoom: 18 }
    );

    const dark = L.tileLayer(
      "https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=YOUR_MAPBOX_KEY",
      { maxZoom: 18 }
    );

    streets.addTo(map);

    // Overlays
    const allEarthquakes = new L.LayerGroup();
    const majorEarthquakes = new L.LayerGroup();
    const tectonicPlates = new L.LayerGroup();

    const overlays = {
      "Earthquakes": allEarthquakes,
      "Major Earthquakes": majorEarthquakes,
      "Tectonic Plates": tectonicPlates,
    };

    L.control.layers(
      { Streets: streets, Satellite: satellite, Dark: dark },
      overlays
    ).addTo(map);

    // Utils
    const colors = ["#98ee00", "#d4ee00", "#eecc00", "#ee9c00", "#fc6b03", "#ea2c2c", "#730101"];
    const magnitudes = [0, 1, 2, 3, 4, 5, 6];

    const getColor = (mag) => {
      return mag > 6 ? colors[6] :
        mag > 5 ? colors[5] :
        mag > 4 ? colors[4] :
        mag > 3 ? colors[3] :
        mag > 2 ? colors[2] :
        mag > 1 ? colors[1] : colors[0];
    };

    const getRadius = (mag) => (mag > 0 ? mag * 4 : 1);

    // Fetch All Earthquakes
    d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
      .then((data) => {
        L.geoJSON(data, {
          pointToLayer: (feature, latlng) => L.circleMarker(latlng),
          style: (feature) => ({
            fillColor: getColor(feature.properties.mag),
            radius: getRadius(feature.properties.mag),
            color: "#000",
            weight: 0.5,
            opacity: 1,
            fillOpacity: 1,
          }),
          onEachFeature: (feature, layer) => {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);

          },
        }).addTo(allEarthquakes);

        allEarthquakes.addTo(map);
      });

    // Major Earthquakes > 4.5
    d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson")
      .then((data) => {
        L.geoJSON(data, {
          pointToLayer: (feature, latlng) => L.circleMarker(latlng),
          style: (feature) => ({
            fillColor: getColor(feature.properties.mag),
            radius: getRadius(feature.properties.mag),
            color: "#000",
            weight: 3,
            opacity: 1,
            fillOpacity: 1,
          }),
          onEachFeature: (feature, layer) => {
            layer.bindPopup(
              `Magnitude: ${feature.properties.mag}<br>
               Location: ${feature.properties.place}`
            );
          },
        }).addTo(majorEarthquakes);

        majorEarthquakes.addTo(map);
      });

    // Tectonic Plates
    d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json")
      .then((data) => {
        L.geoJSON(data, {
          color: "orange",
          weight: 2,
        }).addTo(tectonicPlates);

        tectonicPlates.addTo(map);
      });

    // Legend
    const legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "legend bg-white p-3 rounded shadow");

      for (let i = 0; i < magnitudes.length; i++) {
        div.innerHTML += `
          <div class="flex items-center space-x-2">
            <span class="inline-block w-4 h-4" 
              style="background:${colors[i]}"></span>
            <p>${magnitudes[i]} ${magnitudes[i + 1] ? "– " + magnitudes[i + 1] : "+"}</p>
          </div>
        `;
      }
      return div;
    };

    legend.addTo(map);
  }, []);

  return (
    <div className="w-full h-screen">
      <div id="map" className="w-full h-full rounded-lg shadow-lg"></div>
    </div>
  );
}
