import React, { useState, useEffect } from "react"
import Restaurant from "./Restaurant"
import Food from "./images/food.webp"

const RestaurantList = () => {
  const dataset = []
  const [restaurant, setRestaurant] = useState(dataset)

  async function fetchData() {
    try {
      let res = await fetch("http://tummypolice.iyangi.com/api/v1/restaurants")
      let data = await res.json()
      setRestaurant(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="restaurantList">
      <h1> Popular Brands </h1>
      {restaurant.map(item => (
        <Restaurant id={item.id} name={item.name} img={Food} key={item.id} />
      ))}
    </div>
  )
}
export default RestaurantList
