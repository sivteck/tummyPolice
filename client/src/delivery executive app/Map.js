import React, { useEffect } from "react"
import "./mapStyle.css"
import L from "leaflet"

function Map() {
  var map = () => {
    var mymap = L.map("mapid")

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap)

    mymap.locate({ setView: true, maxZoom: 50, watch: true })

    function onLocationFound(e) {
      L.marker(e.latlng).addTo(mymap)
    }

    mymap.on("locationfound", onLocationFound)
  }

  useEffect(() => {
    map()
  }, [])

  return <div id="mapid"></div>
}

export default Map
