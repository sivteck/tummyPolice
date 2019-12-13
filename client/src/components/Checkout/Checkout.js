import React, { useEffect, useState } from "react"
import { CartProvider } from "../Cart/CartContext"
import Map from "../delivery executive app/Map.js"
import URL from "../../config"
import CheckStatus from "../Checkstatus/CheckStatus"

const Checkout = () => {
  const [checkout, setCheckout] = useState({ cartItems: {}, bill: {} })
  const [fetchStatus, setFetchStatus] = useState(true)
  const [, setLiveLocation] = useState({
    latitude: "",
    longitude: ""
  })

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

  function placeOrder() {
    navigator.geolocation.watchPosition(function(position) {
      setLiveLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    })
  }

  return (
    <div className="checkoutFlex">
      <CheckStatus status={fetchStatus} />
      <div className="flexContainer">{<Map />}</div>
      <div className="flexContainer">
        <CartProvider>
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
            <button onClick={placeOrder}>Order</button>
          </div>
        </CartProvider>
      </div>
    </div>
  )
}

export default Checkout