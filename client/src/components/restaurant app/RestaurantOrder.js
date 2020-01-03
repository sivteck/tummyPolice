import React, { useState } from "react"
import { reverseGeocode } from "../../Utils/reverseGeocode"
import "./style.css"

const io = require("socket.io-client")
const socket = io("https://tummypolice.iyangi.com")

const RestaurantOrder = ({ location }) => {
  const restaurantId = location.state.response.id
  const [orderDetails, setOrderDetails] = useState([])
  const [orderConfirmation, setOrderConfirmation] = useState(false)
  const [address, setAddress] = useState("")

  socket.emit("active restaurant", restaurantId)

  let exist = socket.hasListeners("order details")

  if (!exist) {
    socket.on("order details", function(orders) {
      const { cartItems, orderId, location } = orders
      let order = {
        orderId,
        items: {}
      }
      const items = Object.keys(cartItems)
      items.map(item => {
        const { name, quantity } = cartItems[item]
        const itemObj = {}
        itemObj.name = name
        itemObj.quantity = quantity
        order.items[item] = itemObj
      })
      setOrderDetails([order])

      const fetchAddress = async () => {
        setAddress(await reverseGeocode(location))
      }
      fetchAddress()
      console.log("addr", address)
    })
  }

  const confirmOrder = order => {
    setOrderConfirmation(true)
    socket.emit("order approved", order.orderId)
  }
  return (
    <div className="newOrder">
      {orderDetails.length === 0 ? (
        <h1>No Orders</h1>
      ) : (
        <h1>{orderDetails.length} new order</h1>
      )}
      {orderDetails.map(order => (
        <div key={order} className="order">
          <pre>Order Id: {order.orderId}</pre>
          <br />
          {Object.keys(order.items).map(item => {
            return (
              <div key={item}>
                <p>Item: {order.items[item].name}</p>
                <p>Quantity: {order.items[item].quantity}</p>
              </div>
            )
          })}
          <p>Customer Address: {address.Match_addr}</p>

          {orderConfirmation ? (
            <h2>Order Confirmed</h2>
          ) : (
            <button className="confirmBtn" onClick={() => confirmOrder(order)}>
              Confirm Order
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

export default RestaurantOrder
