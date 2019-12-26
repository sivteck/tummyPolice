import React, { useState, useEffect } from "react"
import { promisifiedGetCurrentPosition } from "../../Utils/promisifiedGetCurrentPosition"

const io = require("socket.io-client")
const socket = io("https://tummypolice.iyangi.com")

function Tracking({ location }) {
  console.log("response", location.state.response.id)
  const deliveryPartnerId = location.state.response.id
  const [orderDetails, setOrderDetails] = useState([])

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const location = await promisifiedGetCurrentPosition()
      console.log("location", location)
      socket.emit("update location", location)
    }, 10000)
    return () => clearInterval(intervalId)
  }, [])

  socket.emit("active delivery partner", deliveryPartnerId)

  socket.on("new task", function(orders) {
    console.log("orders at delivery page", orders)
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
    console.log("confirm", order.orderId)
    socket.emit("task accepted", order.orderId)
  }

  return (
    <div>
      Orders to deliver
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

          <button onClick={() => confirmOrder(order)}>Accept Order</button>
        </div>
      ))}
    </div>
  )
}

export default Tracking
