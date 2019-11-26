import React, { useEffect } from "react"
import "./mapStyle.css"
import Leaflet from "leaflet"

function Map() {
  let map = () => {
    let mymap = Leaflet.map("mapid")

    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap)
    console.log("1")

    mymap.locate({ setView: true, maxZoom: 50, watch: true })
    console.log("2")
    function onLocationFound(e) {
      Leaflet.marker(e.latlng).addTo(mymap)
    }

    mymap.on("locationfound", onLocationFound)
  }

  useEffect(() => {
    map()
  }, [])

  return <div id="mapid"></div>
}

export default Map
