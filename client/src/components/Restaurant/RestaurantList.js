import React, { useState, useEffect, Fragment } from "react"
import Restaurant from "./Restaurant"
import Food from "../../images/food.webp"
import NavBar from "../Navbar/NavBar"
import URL from "../../config"
import CheckStatus from "../Checkstatus/CheckStatus"
import "./style.css"
import { RestaurantImages } from "../../Utils/restaurantImages"

const RestaurantList = ({ location }) => {
  const { userDetails, locationId } = location.state
  const [restaurant, setRestaurant] = useState([])
  const [isStatusOk, setStatusOk] = useState(true)
  let url = `${URL}/restaurants`

  async function fetchData(url) {
    try {
      let res = await fetch(url)
      let data = await res.json()

      setStatusOk(res.ok)
      setRestaurant(data)
    } catch (error) {
      setStatusOk(false)
      console.log(error)
    }
  }
  useEffect(() => {
    if (locationId) {
      url = `${url}?placeid=${locationId}`
      fetchData(url)
    } else {
      navigator.geolocation.getCurrentPosition(function(position) {
        url = `${url}?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
        fetchData(url)
      })
    }
  }, [])

  return (
    <Fragment>
      <CheckStatus status={isStatusOk} />
      <NavBar />
      <header> Popular Brands </header>
      <section className="restaurantList">
        <section>
          {console.log(RestaurantImages)}
          {restaurant.map((item, index) => {
            console.log(index)
            return (
              <Restaurant
                id={item.id}
                name={item.name}
                img={RestaurantImages[index]}
                key={item.id}
              />
            )
          })}
        </section>
      </section>
    </Fragment>
  )
}
export default RestaurantList
