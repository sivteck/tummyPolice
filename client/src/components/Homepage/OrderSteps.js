import React from "react"
import Locate from "../../images/1.png"
import Restaurant from "../../images/2.png"
import Order from "../../images/3.png"
import Food from "../../images/4.png"

function OrderSteps() {
  return (
    <section className="orderSteps">
      <hgroup className="subHeading">
        <h1> How To Order? </h1>
        <h5> Follow the Steps </h5>
      </hgroup>
      <article>
        <figure>
          <img src={Locate} alt="" />
          <figcaption>Choose your location</figcaption>
        </figure>
        <figure>
          <img src={Restaurant} alt="" />
          <figcaption>Choose Restaurant</figcaption>
        </figure>
        <figure>
          <img src={Order} alt="" />
          <figcaption>Place Order</figcaption>
        </figure>
        <figure>
          <img src={Food} alt="" />
          <figcaption>Food is on the way</figcaption>
        </figure>
      </article>
    </section>
  )
}

export default OrderSteps
