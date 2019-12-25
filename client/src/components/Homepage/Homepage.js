import React from "react"
import { Link } from "react-router-dom"
import Logo from "../../images/logo.png"
import Locate from "../Locate/Locate"
import OrderSteps from "./OrderSteps"
import "./style.css"

const Homepage = () => {
  return (
    <section className="outer">
      <main>
        <section className="center">
          <img className="logo" src={Logo} alt="logo" />
          <hgroup className="heading">
            <h1>Order food online from the best restaurants </h1>
            <h2> Enter your delivery location to get started </h2>
          </hgroup>
          <Locate />
        </section>
        <section>
          <section className="inline">
            <Link to="/login" className="link">
              Login
            </Link>
            <Link to="/signup" className="link">
              Signup
            </Link>
          </section>
        </section>
      </main>
      <OrderSteps />
    </section>
  )
}

export default Homepage
