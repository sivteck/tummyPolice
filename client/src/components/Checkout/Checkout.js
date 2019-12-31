import React, { useEffect, useState, Fragment } from "react"
import URL from "../../config"
import CheckStatus from "../Checkstatus/CheckStatus"
import NavBar from "../Navbar/NavBar"
import { Redirect } from "react-router-dom"
import styled from "styled-components"
import { promisifiedGetCurrentPosition } from "../../Utils/promisifiedGetCurrentPosition"

const Aside = styled.section`
  display: grid;
  grid-template-column: 20% 40% 30% 10%;
  padding: 20px;
  margin: 10px;
  min-height: 100%;
  background: #e9ecee;
`
const Section = styled.section`
  padding: 10px;
`

const Button = styled.button`
  width: 200px;
  margin-top: 5%;
  cursor: pointer;
  border: none;
  font-size: 15px;
  font-weight: 600;
  height: 50px;
  color: #fff;
  background-color: #fc8019;
  text-transform: uppercase;
`

const header = {
  fontSize: "20px",
  fontWeight: "800"
}

const restaurantCity = {
  fontSize: "15px",
  color: "#686b78"
}

const InnerSection = styled.section`
  display: flex;
`

const styleItem = {
  textTransform: "capitalize",
  flexBasis: "33%"
}

const Checkout = () => {
  const [checkout, setCheckout] = useState({
    restaurantId: "",
    cartItems: {},
    bill: {}
  })
  const [fetchStatus, setFetchStatus] = useState(true)
  const [isStatusOk, setStatusOk] = useState(false)
  const [response, setResponse] = useState({})
  const [cartStatus, setCartStatus] = useState(true)
  const [restaurantDetails, setRestaurantDetails] = useState({})
  const userDetails = JSON.parse(localStorage.getItem("userDetails"))
  const restaurantId = checkout.restaurantId

  async function fetchData() {
    try {
      let checkoutResponse = await fetch(`${URL}/checkout`)
      let checkoutData = await checkoutResponse.json()
      setCheckout(checkoutData)
      setFetchStatus(checkoutResponse.ok)
      let restaurantDetailsResponse = await fetch(
        `${URL}/restaurant/info?id=${checkoutData.restaurantId}`
      )
      let restaurantDetailsdata = await restaurantDetailsResponse.json()
      setRestaurantDetails(restaurantDetailsdata)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  async function order() {
    let location = await promisifiedGetCurrentPosition()
    try {
      let res = await fetch(`${URL}/order`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userDetails,
          order: checkout,
          location
        })
      })
      let result = await res.json()
      setResponse(result)
      setStatusOk(res.ok)
    } catch (error) {
      console.log("error", error)
      setStatusOk(false)
    }
    try {
      let res = await fetch(`${URL}/cart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          restaurantId: "",
          cartItems: {}
        })
      })
      setCartStatus(res.ok)
    } catch (error) {
      setCartStatus(false)
    }
  }

  function placeOrder() {
    if (isStatusOk && cartStatus && response.hasOwnProperty("error")) {
      return (
        <div>
          <p style={{ textTransform: "capitalize" }}>{response.error}</p>
        </div>
      )
    }
    if (isStatusOk && cartStatus) {
      return (
        <div>
          <Redirect to={{ pathname: "/order/track", state: { response } }} />
        </div>
      )
    }
  }

  return (
    <Fragment>
      <CheckStatus status={fetchStatus} />
      <Aside>
        <Section>
          <p style={header}>{restaurantDetails.name}</p>
          <p style={restaurantCity}> {restaurantDetails.description}</p>
        </Section>
        <Section>
          {Object.keys(checkout.cartItems).map(item => (
            <InnerSection key={item}>
              <p style={styleItem}> {checkout.cartItems[item].name}</p>
              <p style={styleItem}> {checkout.cartItems[item].quantity}</p>
              <p style={styleItem}> &#8377; {checkout.cartItems[item].price}</p>
            </InnerSection>
          ))}
        </Section>
        <Section>
          <p style={header}>Bill Details</p>
          <div className="billDetails">
            <div className="cartItem">
              <div>Item Total</div>
              <div> &#8377; {checkout.bill.subtotal}</div>
            </div>
            <div className="cartItem">
              <div>Delivery Fee</div>
              <div> &#8377; {checkout.bill.deliveryfee}</div>
            </div>
            <div className="cartItem">
              <div>To Pay:</div>
              <div> &#8377; {checkout.bill.total}</div>
            </div>
          </div>
        </Section>
        <Section>
          <Button onClick={order}>Order</Button>
        </Section>
        {placeOrder()}
      </Aside>
    </Fragment>
  )
}

export default Checkout
