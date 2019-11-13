import React, { useContext, useEffect, useState } from "react"
import { CartContext, CartProvider } from "./CartContext"

const Checkout = () => {
  const [checkout, setCheckout] = useState({ cart: {}, bill: {} })

  async function fetchData() {
    try {
      let res = await fetch("http://tummypolice.iyangi.com/api/v1/checkout")
      let data = await res.json()
      setCheckout(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  function placeOrder() {
    let location = navigator.geolocation.watchPosition(function(position) {
      return (position.coords.latitude, position.coords.longitude)
      console.log(location)
    })
    fetch("http://tummypolice.iyangi.com/api/v1/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ checkout, location })
    })
      .then(resp => resp.json())
      .then(() => {})
  }

  return (
    <CartProvider>
      <div>
        <h1>Items</h1>
        {Object.keys(checkout.cart).map(item => (
          <div className="cartItem">
            <div> {checkout.cart[item].name}</div>
            <div> {checkout.cart[item].quantity}</div>
            <div> &#8377; {checkout.cart[item].price}</div>
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
        <button onClick={placeOrder}>Order</button>
      </div>
    </CartProvider>
  )
}

export default Checkout
