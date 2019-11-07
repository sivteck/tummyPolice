import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Menu from "./Menu"

const Restaurant = props => {
  let id = `/restaurant/${props.id}`

  return (
    <Link to={id}>
      <div className="restaurant">
        <div className="rest">
          <img src={props.img} />
          <div>{props.name}</div>
        </div>
      </div>
    </Link>
  )
}

export default Restaurant
