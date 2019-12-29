import React, { useEffect, useState } from "react"
import { CartProvider } from "../Cart/CartContext"
import URL from "../../config"
import CheckStatus from "../Checkstatus/CheckStatus"
import NavBar from "../Navbar/NavBar"
import { Redirect } from "react-router-dom"
import { promisifiedGetCurrentPosition } from "../../Utils/promisifiedGetCurrentPosition"

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

  const userDetails = JSON.parse(localStorage.getItem("userDetails"))

  async function fetchData() {
    try {
      let res = await fetch(`${URL}/checkout`)
      let data = await res.json()
      setCheckout(data)
      setFetchStatus(res.ok)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  async function order() {
    let location = await promisifiedGetCurrentPosition()
    console.log("location from promisified function", location)
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
      console.log("result from checkout ", result)
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
      console.log("cart", res.ok)
      setCartStatus(res.ok)
    } catch (error) {
      setCartStatus(false)
    }
  }

  function placeOrder() {
    console.log("dgfd", isStatusOk)
    console.log("gjj", cartStatus)
    if (isStatusOk && cartStatus && response.hasOwnProperty("error")) {
      return (
        <div>
          <p style={{ textTransform: "capitalize" }}>{response.error}</p>
        </div>
      )
    }
    if (isStatusOk && cartStatus) {
      console.log("Order status", isStatusOk)
      return (
        <div>
          <Redirect to={{ pathname: "/order/track", state: { response } }} />
        </div>
      )
    }
  }

  return (
    <div>
      <CheckStatus status={fetchStatus} />
      <NavBar />
      <div>
        <h1>Items</h1>
        {Object.keys(checkout.cartItems).map(item => (
          <div className="cartItem" key={item}>
            <div> {checkout.cartItems[item].name}</div>
            <div> {checkout.cartItems[item].quantity}</div>
            <div> &#8377; {checkout.cartItems[item].price}</div>
          </div>
        ))}
        <h1>Bill Details</h1>
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
        <button onClick={order}>Order</button>
        {placeOrder()}
      </div>
    </div>
  )
}

export default Checkout
