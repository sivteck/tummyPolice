import React, { useState, useEffect, Fragment } from "react"
import Restaurant from "./Restaurant"
import NavBar from "../Navbar/NavBar"
import URL from "../../config"
import CheckStatus from "../Checkstatus/CheckStatus"
import "./style.css"
import { RestaurantImages } from "../../assets/restaurantImages"
import { promisifiedGetCurrentPosition } from "../../Utils/promisifiedGetCurrentPosition"
import { getRequest } from "../../Utils/getRequest"

const RestaurantList = ({ location }) => {
  const { userDetails, locationId } = location.state
  const [restaurant, setRestaurant] = useState([])
  const [isStatusOk, setStatusOk] = useState(true)

  async function fetchData(url) {
    const { response, result, error } = await getRequest(url)
    if (response) {
      setStatusOk(response.ok)
      setRestaurant(result)
    }
    if (error) {
      setStatusOk(false)
    }
  }

  useEffect(() => {
    if (locationId) {
      let url = `${URL}/restaurants?placeid=${locationId}`
      fetchData(url)
    } else {
      const getLocation = async () => {
        let location = await promisifiedGetCurrentPosition()
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
