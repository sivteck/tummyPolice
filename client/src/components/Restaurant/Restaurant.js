import React from "react"
import { Link } from "react-router-dom"

const Restaurant = ({ id, img, name }) => {
  let Id = `/restaurant/${id}`

  return (
    <Link to={Id}>
      <div className="restaurant">
        <div className="rest">
          <img src={img} alt="Restaurant" />
          <div>{name}</div>
        </div>
      </div>
    </Link>
  )
}

export default Restaurant
