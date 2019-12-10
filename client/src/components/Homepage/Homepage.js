import React from "react"
import { Link } from "react-router-dom"
import Logo from "../../images/logo.png"
import Locate from "../UserLocation/Locate"
import styled from "styled-components"
import OrderSteps from "./OrderSteps"

const Homepage = () => {
  const StyledLink = styled(Link)`
    background-color: #db741e;
    color: #fff;
    border: none;
    padding: 15px;
    text-decoration: none;
  `

  return (
    <div classname="flex1">
      <div className="bg">
        <div className="flex2">
          <div className="logoDiv">
            <img className="logo" src={Logo} alt="" />
          </div>
          <div>
            <StyledLink to="/login">Login</StyledLink>
          </div>
          <div>
            <StyledLink to="/signup">Sign up</StyledLink>
          </div>
        </div>
        <h1>Order food online from the best restaurants </h1>
        <h2> Enter your delivery location to get started </h2>
        <Locate />
      </div>
      <div>
        <OrderSteps />
      </div>
    </div>
  )
}

export default Homepage
