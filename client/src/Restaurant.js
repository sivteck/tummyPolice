import React from "react"
import { Link } from "react-router-dom"

const Restaurant = props => {
  let id = `/restaurant/${props.id}`

  return (
    <Link to={id}>
      <div className="restaurant">
        <div className="rest">
          <img src={props.img} alt="Restaurant" />
          <div>{props.name}</div>
        </div>
      </div>
    </Link>
  )
}

export default Restaurant
