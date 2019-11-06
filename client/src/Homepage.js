import React from "react"
import { Link } from "react-router-dom"
import Logo from "./images/logo.png"
import Locate from "./images/1.png"
import Restaurant from "./images/2.png"
import Order from "./images/3.png"
import Food from "./images/4.png"
import Location from "./Location"
import Login from "./Login"

function Homepage() {
  return (
    <div classname="flex1">
      <div className="bg">
        <div className="flex2">
          <div className="logoDiv">
            {" "}
            <img className="logo" src={Logo} alt="" />
          </div>
          {/* <button className="login" >Login</button> */}

          <Link to="/login">
            {" "}
            <div>
              <button className="login">Login</button>
            </div>
          </Link>
          <Link to="/signup">
            {" "}
            <div>
              <button className="signup">Sign up</button>
            </div>
          </Link>
        </div>
        <h1>Order food online from the best restaurants </h1>
        <h2> Enter your delivery location to get started </h2>
        <Location />

        <Link to="/restaurant">
          <button className="seeRestaurant">Restaurants</button>
        </Link>
      </div>

      <div className="order">
        <h1> How To Order? </h1>
        <h5> Follow the Steps </h5>
        <div className="flex-1">
          <div>
            <img className="step" src={Locate} alt="" />
            <h3>Choose your location</h3>
          </div>
          <div>
            <img className="step" src={Restaurant} alt="" />
            <h3>Choose Restaurant</h3>
          </div>
          <div>
            <img className="step" src={Order} alt="" />
            <h3>Place Order</h3>
          </div>
          <div>
            <img className="step" src={Food} alt="" />
            <h3>Food is on the way</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage
