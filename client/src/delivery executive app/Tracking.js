import React, { useState, useEffect, useRef } from "react"

const io = require("socket.io-client")
const socket = io("https://tummypolice.iyangi.com")

function Tracking() {
  const [liveLocation, setLiveLocation] = useState({
    latitude: "",
    longitude: ""
  })

  const internalRef = useRef(undefined)
  useEffect(() => {
    clearInterval(internalRef.current)
    internalRef.current = setInterval(
      () =>
        navigator.geolocation.getCurrentPosition(function(position) {
          setLiveLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        }),
      10000
    )
  }, [])

  socket.emit("send location", {
    latitude: liveLocation.latitude,
    longitude: liveLocation.longitude
  })

  return (
    <div>
      <h2> Live Location</h2>
      <p>latitude:{liveLocation.latitude}</p>
      <p>longitude: {liveLocation.longitude}</p>
    </div>
  )
}

export default Tracking
