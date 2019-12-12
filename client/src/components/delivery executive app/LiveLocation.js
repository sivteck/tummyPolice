import React, { useState, useEffect } from "react"
import URL from "../../config"

function LiveLocation() {
  const [liveLocation, setLiveLocation] = useState({
    latitude: "",
    longitude: ""
  })
  console.log("nav", navigator)

  navigator.geolocation.watchPosition(function(position) {
    setLiveLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  })

  async function fetchData() {
    try {
      const res = await fetch(`${URL}/deliverypartner/track`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(liveLocation)
      })

      console.log("body", JSON.stringify(liveLocation))
      const result = await res.json()
      console.log("asyncFunction", result)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [liveLocation])

  console.log("location", liveLocation)
  return (
    <div>
      <h2> Live Location</h2>
      <p>latitude:{liveLocation.latitude}</p>
      <p>longitude: {liveLocation.longitude}</p>
    </div>
  )
}

export default LiveLocation
