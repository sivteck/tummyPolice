import React, { useState, useEffect } from "react"
import Restaurant from "./Restaurant"
import Food from "../images/food.webp"
import NavBar from "./NavBar"

const RestaurantList = ({ location }) => {
  console.log("from Restaurant list", location)
  const { userDetails, locationId } = location.state
  const [restaurant, setRestaurant] = useState([])
  const [isStatusOk, setStatusOk] = useState(false)
  let url = "https://tummypolice.iyangi.com/api/v1/restaurants"

  async function fetchData({ latitude, longitude }) {
    console.log("lat-lng from fetch", latitude, longitude)
    try {
      let res = await fetch(url)
      let data = await res.json()
      setStatusOk(res.ok)
      setRestaurant(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (locationId) {
      url = `${url}?placeid= ${locationId}`
      fetchData(url)
    } else {
      navigator.geolocation.getCurrentPosition(function(position) {
        url = `${url}?latitude=${position.cords.latitude}&longitude=${position.cords.longitude}`
        fetchData(url)
      })
    }
  }, [])

  return { isStatusOk } ? (
    <div className="restaurantList">
      <NavBar userDetails={userDetails} />
      <h1> Popular Brands </h1>
      {restaurant.map(item => (
        <Restaurant id={item.id} name={item.name} img={Food} key={item.id} />
      ))}
    </div>
  ) : (
    <div>unable to fetch restaurant list</div>
  )
}
export default RestaurantList
