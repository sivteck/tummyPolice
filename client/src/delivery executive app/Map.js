import React, { useEffect } from "react"
import "./mapStyle.css"
import Leaflet from "leaflet"

function Map() {
  const map = () => {
    const position = [51.505, -0.09]
    const position2 = [51.504, -0.09]
    const mymap = Leaflet.map("mapid").setView(position, 40)

    Leaflet.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    ).addTo(mymap)

    Leaflet.marker(position).addTo(mymap)

    Leaflet.circle(position2, {
      color: "red",
      fillColor: "red",
      fillOpacity: 0.5,
      radius: 5
    }).addTo(mymap)
  }

  useEffect(() => {
    map()
  }, [])

  return <div id="mapid"></div>
}

export default Map
