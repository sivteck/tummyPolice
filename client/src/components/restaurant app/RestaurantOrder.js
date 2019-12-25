import React, { useState } from "react"

const io = require("socket.io-client")
const socket = io("https://tummypolice.iyangi.com")

const RestaurantOrder = ({ location }) => {
  const restaurantId = location.state.response.id
  const [orderDetails, setOrderDetails] = useState([])
  console.log("orderDetails", orderDetails)
  const [orderConfirmation, setOrderConfirmation] = useState(false)

  socket.emit("active restaurant", restaurantId)

  socket.on("order details", function(orders) {
    const { cartItems, orderId } = orders
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
    setOrderDetails([...orderDetails, order])
  })

  const confirmOrder = order => {
    setOrderConfirmation(true)
    console.log("confirm", order.orderId)
    socket.emit("order approved", order.orderId)
  }
  return (
    <div>
      Orders to Prepare
      {orderDetails.map(order => (
        <div
          key={order}
          style={{
            width: "50%",
            border: "2px solid orange",
            padding: "10px",
            margin: "10px auto"
          }}
        >
          <p>Order Id: {order.orderId}</p>
          <br />
          {Object.keys(order.items).map(item => {
            return (
              <div key={item}>
                <p>Item: {order.items[item].name}</p>
                <p>Quantity: {order.items[item].quantity}</p>
              </div>
            )
          })}

          <button onClick={() => confirmOrder(order)}>
            {orderConfirmation ? "Order Confirmed" : "Confirm Order"}
          </button>
        </div>
      ))}
    </div>
  )
}

export default RestaurantOrder
