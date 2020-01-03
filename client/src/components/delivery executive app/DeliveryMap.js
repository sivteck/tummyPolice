import React, { useEffect, useState, useRef } from "react"
import Leaflet from "leaflet"
import "leaflet-routing-machine"
import bike from "../../images/bike1.png"
import deliveryIcon from "../../images/deliveryicon.png"

const DeliveryMap = ({ usersLocation, deliveryPartnerLocation }) => {
  const position = [usersLocation.latitude, usersLocation.longitude]
  const position2 = [
    deliveryPartnerLocation.latitude,
    deliveryPartnerLocation.longitude
  ]

  const mapRef = useRef(null)
  const map = () => {
    mapRef.current = Leaflet.map("mapid").setView(position, 40)

    Leaflet.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    ).addTo(mapRef.current)
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
    }).addTo(mapRef.current)
  }, [position2])

  return (
    <div>
      <div id="mapid"></div>
    </div>
  )
}

export default DeliveryMap
