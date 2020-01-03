import React, { useEffect, useState, Fragment } from "react"
import URL from "../../config"
import CheckStatus from "../Checkstatus/CheckStatus"
import { Redirect } from "react-router-dom"
import styled from "styled-components"
import { promisifiedGetCurrentPosition } from "../../Utils/promisifiedGetCurrentPosition"
import { getRequest } from "../../Utils/getRequest"
import { postRequest } from "../../Utils/postRequest"

const Aside = styled.section`
  display: grid;
  grid-template-column: 20% 40% 30% 10%;
  padding: 20px;
  margin: 10px;
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
  const [didMount, setDidMount] = useState(false)

  const emptyCart = async () => {
    const data = {
      restaurantId: "",
      cartItems: {}
    }
    const { response, error } = await postRequest(`${URL}/cart`, data)
    if (response) setCartStatus(response.ok)
    if (error) setCartStatus(false)
  }

  const order = async () => {
    const location = await promisifiedGetCurrentPosition()
    const data = {
      userDetails,
      order: checkout,
      location
    }
    const { response, result, error } = await postRequest(`${URL}/order`, data)
    if (response) {
      setResponse(result)
      setStatusOk(response.ok)
    }
    if (error) {
      setStatusOk(false)
    }
    emptyCart()
  }

  const placeOrder = () => {
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

  const fetchRestaurantDetails = async dataUrl => {
    const { response, result, error } = await getRequest(
      `${URL}/restaurant/info?id=${dataUrl.restaurantId}`
    )
    if (response) {
      setRestaurantDetails(result)
      setFetchStatus(response.ok)
    }
    if (error) {
      setFetchStatus(false)
    }
  }

  const fetchData = async () => {
    const { response, result, error } = await getRequest(`${URL}/checkout`)
    if (response) {
      setCheckout(result)
      setFetchStatus(response.ok)
    }
    if (error) {
      setFetchStatus(false)
    }
    fetchRestaurantDetails(result)
  }

  useEffect(() => {
    fetchData()
  }, [])

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
