import React, { useState, useEffect, Fragment } from "react"
import Restaurant from "./Restaurant"
import Food from "../../images/food.webp"
import NavBar from "../Navbar/NavBar"
import URL from "../../config"
import CheckStatus from "../Checkstatus/CheckStatus"
import "./style.css"
import { RestaurantImages } from "../../Utils/restaurantImages"
import { promisifiedGetCurrentPosition } from "../../Utils/promisifiedGetCurrentPosition"

const RestaurantList = ({ location }) => {
  const { userDetails, locationId } = location.state
  const [restaurant, setRestaurant] = useState([])
  const [isStatusOk, setStatusOk] = useState(true)

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
      let url = `${URL}/restaurants?placeid=${locationId}`
      fetchData(url)
    } else {
      const getLocation = async () => {
        let location = await promisifiedGetCurrentPosition()
        console.log("location from promisified geoapi", location)
        let url = `${URL}/restaurants?latitude=${location.latitude}&longitude=${location.longitude}`
        localStorage.setItem("location", JSON.stringify(location))
        fetchData(url)
      }
      getLocation()
    }
  }, [])

  return (
    <Fragment>
      <CheckStatus status={isStatusOk} />
      <NavBar />
      <header> Popular Brands </header>
      <section className="restaurantList">
        <section>
          {restaurant.map((item, index) => {
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
