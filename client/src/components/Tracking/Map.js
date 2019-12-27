import React, { useEffect, useState, useRef } from "react"
import "./mapStyle.css"
import Leaflet from "leaflet"
import "leaflet-routing-machine"

const io = require("socket.io-client")
const socket = io("https://tummypolice.iyangi.com")

function Map({ location }) {
  console.log("from checkout to map", location.state.response.orderid.id)
  const [liveLocation, setLiveLocation] = useState({
    latitude: "",
    longitude: ""
  })

  const userId = JSON.parse(localStorage.getItem("userDetails")).id
  console.log("userId from map", userId)

  const orderId = location.state.response.orderid.id

  const position = [12.9606811, 77.6436253]
  const position2 = [liveLocation.latitude, liveLocation.longitude]

  socket.emit("active user", userId)

  socket.emit("active order", orderId)

  let timeout
  socket.on("order location", location => {
    clearInterval(timeout)
    timeout = setInterval(() => {
      console.log("location from map", location)
      setLiveLocation(location)
    }, 10000)
  })

  const mapRef = useRef(null)
  const map = () => {
    mapRef.current = Leaflet.map("mapid").setView(position, 40)

    Leaflet.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    ).addTo(mapRef.current)

    Leaflet.marker(position).addTo(mapRef.current)
  }

  useEffect(() => {
    map()
  }, [])

  const markerRef = useRef(null)
  let routingControl = useRef(null)

  const removeRoutingControl = function() {
    if (routingControl.current != null) {
      mapRef.current.removeControl(routingControl.current)
      routingControl.current = null
    }
  }

  useEffect(() => {
    if (markerRef.current) {
      console.log("markerRef", markerRef.current)
      markerRef.current.setLatLng(position2)
      if (routingControl.current != null) removeRoutingControl()
      routingControl.current = Leaflet.Routing.control({
        waypoints: [Leaflet.latLng(position), Leaflet.latLng(position2)]
      }).addTo(mapRef.current)
    } else {
      markerRef.current = Leaflet.marker(position2).addTo(mapRef.current)
      if (routingControl.current != null) removeRoutingControl()
      routingControl.current = Leaflet.Routing.control({
        waypoints: [Leaflet.latLng(position), Leaflet.latLng(position2)]
      }).addTo(mapRef.current)
    }
  }, [liveLocation])

  return <div id="mapid"></div>
}

export default Map
