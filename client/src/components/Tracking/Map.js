import React, { useEffect, useState, useRef } from "react"
import "./mapStyle.css"
import Leaflet from "leaflet"
import "leaflet-routing-machine"
import bike from "../../images/bike1.png"
import deliveryIcon from "../../images/deliveryicon.png"

const io = require("socket.io-client")
const socket = io("https://tummypolice.iyangi.com")

function Map({ location }) {
  console.log("from checkout to map", location.state.response.orderid.id)
  const [liveLocation, setLiveLocation] = useState({
    latitude: "",
    longitude: ""
  })

  const [orderAccepted, setOrderAccepted] = useState(false)
  const [orderPickedUp, setOrderPickedUp] = useState(false)
  const [orderDelivered, setOrderDelivered] = useState(false)
  const [orderApproved, setOrderApproved] = useState(false)

  const userId = JSON.parse(localStorage.getItem("userDetails")).id
  console.log("userId from map", userId)

  const orderId = location.state.response.orderid.id

  const position = [12.9606811, 77.6436253]
  const position2 = [liveLocation.latitude, liveLocation.longitude]
  console.log("position2", position2)
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

    // Leaflet.marker(position).addTo(mapRef.current)
  }

  useEffect(() => {
    map()
  }, [])

  const markerRef = useRef(null)
  let routingControl = useRef(null)

  const bikeIcon = Leaflet.icon({
    iconUrl: bike,
    iconSize: [35, 35],
    iconAnchor: [10, 15]
  })

  const userLocationIcon = Leaflet.icon({
    iconUrl: deliveryIcon,
    iconSize: [35, 30],
    iconAnchor: [10, 15]
  })

  const removeRoutingControl = () => {
    if (routingControl.current != null) {
      mapRef.current.removeControl(routingControl.current)
      routingControl.current = null
    }
  }

  socket.on("order approved", order => {
    console.log(order)
    setOrderApproved(true)
  })

  socket.on("task accepted", order => {
    console.log(order)
    setOrderAccepted(true)
  })

  socket.on("order pickedup", order => {
    console.log(order)
    setOrderPickedUp(true)
  })
  socket.on("order delivered", order => {
    console.log(order)
    setOrderDelivered(true)
  })

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng(position2)
    }
    if (routingControl.current != null) removeRoutingControl()
    routingControl.current = Leaflet.Routing.control({
      waypoints: [Leaflet.latLng(position), Leaflet.latLng(position2)],
      plan: Leaflet.Routing.plan(
        [Leaflet.latLng(position), Leaflet.latLng(position2)],
        {
          createMarker: function(i, wp) {
            if (i === 0) {
              return Leaflet.marker(wp.latLng, {
                draggable: false,
                icon: userLocationIcon
              })
            }
            if (i === 1) {
              return Leaflet.marker(wp.latLng, {
                draggable: false,
                icon: bikeIcon
              })
            }
          },
          routeWhileDragging: true
        }
      )
      //   {
      //   waypoints: [Leaflet.latLng(position), Leaflet.latLng(position2)]
      // }
    }).addTo(mapRef.current)
  }, [liveLocation])

  return (
    <div id="order">
      <div id="mapid"></div>
      <div id="orderStatus">
        {orderApproved && <h1>Order Approved by Restaurant</h1>}
        {orderAccepted && <h1>Order Accepted</h1>}
        {orderPickedUp && <h1>Order Picked Up</h1>}
        {orderDelivered && <h1>Order Delivered</h1>}
      </div>
    </div>
  )
}

export default Map
