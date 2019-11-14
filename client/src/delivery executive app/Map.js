import React, { useEffect } from "react"
import "./mapStyle.css"
import L from "leaflet"

function Map() {
  var map = () => {
    var mymap = L.map("mapid").setView([12.9614641, 77.6441892], 40)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap)

    L.marker([12.9614641, 77.6441892])
      .addTo(mymap)
      .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
      .openPopup()

    L.circle([12.9617, 77.6444], {
      color: "red",
      fillColor: "red",
      fillOpacity: 0.5,
      radius: 3
    }).addTo(mymap)

    function onMapClick(e) {
      alert("You clicked the map at " + e.latlng)
    }

    mymap.on("click", onMapClick)
  }

  useEffect(() => {
    map()
  }, [])

  return <div id="mapid"></div>
}

export default Map
