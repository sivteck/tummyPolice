import React, { useState } from "react"

const io = require("socket.io-client")
const socket = io("http://localhost:3010")

function Tracking() {
  const [liveLocation, setLiveLocation] = useState({
    latitude: "",
    longitude: ""
  })
  console.log("nav", navigator)

  setInterval(
    () =>
      navigator.geolocation.getCurrentPosition(function(position) {
        setLiveLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      }),
    3000
  )

  socket.emit("send location", {
    latitude: liveLocation.latitude,
    longitude: liveLocation.longitude
  })

  // const handleClick = () => {
  //   console.log("Send Location")
  //   socket.emit("send location", console.log("connected to server"))
  // }
  return (
    <div>
      {/* <button onClick={() => handleClick()}>Send Location</button> */}
      <h2> Live Location</h2>
      <p>latitude:{liveLocation.latitude}</p>
      <p>longitude: {liveLocation.longitude}</p>
    </div>
  )
}

export default Tracking
