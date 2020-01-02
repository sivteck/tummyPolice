import React from "react"
import { Link } from "react-router-dom"

const Restaurant = ({ id, img, name }) => {
  let Id = `/restaurant/${id}`

  return (
    <Link
      to={{ pathname: Id, state: { image: img, name: name } }}
      style={{ textDecoration: "none" }}
    >
      <figure className="restaurant">
        <img src={img} alt="Restaurant" />
        <figcaption>{name}</figcaption>
      </figure>
    </Link>
  )
}

export default Restaurant
