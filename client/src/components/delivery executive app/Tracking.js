import React, { useState, useEffect } from "react"
import { promisifiedGetCurrentPosition } from "../../Utils/promisifiedGetCurrentPosition"
import { reverseGeocode } from "../../Utils/reverseGeocode"
import "./style.css"

const io = require("socket.io-client")
const socket = io("https://tummypolice.iyangi.com")

function Tracking({ location }) {
  console.log("response", location.state.response.id)
  const deliveryPartnerId = location.state.response.id
  const [orderDetails, setOrderDetails] = useState([])
  const [address, setAddress] = useState("")
  const [orderConfirmation, setOrderConfirmation] = useState(false)

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
    setOrderDetails([order])
    const fetchAddress = async () => {
      setAddress(await reverseGeocode(location))
    }
    fetchAddress()
    console.log("addr", address)
  })

  const confirmOrder = order => {
    setOrderConfirmation(true)
    console.log("confirm", order.orderId)
    socket.emit("task accepted", order.orderId)
  }

  return (
    <div className="newOrder">
      {console.log(address)}
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
          <p>Customer Address: {address}</p>

          {orderConfirmation ? (
            <h2>Order Accepted</h2>
          ) : (
            <button className="confirmBtn" onClick={() => confirmOrder(order)}>
              Accept Order
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

export default Tracking
