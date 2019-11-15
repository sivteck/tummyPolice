import React, { useState, useEffect } from "react"
import Restaurant from "./Restaurant"
import Food from "./images/food.webp"
import NavBar from "./NavBar"

const RestaurantList = ({ location }) => {
  const { userDetails } = location.state
  const dataset = []
  const [restaurant, setRestaurant] = useState(dataset)
  const [fetchStatus, setFetchStatus] = useState(false)

  async function fetchData() {
    try {
      let res = await fetch("https://tummypolice.iyangi.com/api/v1/restaurants")
      let data = await res.json()
      setFetchStatus(res.ok)
      setRestaurant(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return { fetchStatus } ? (
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
