import React, { useState, useEffect } from "react"
import { promisifiedGetCurrentPosition } from "../../Utils/promisifiedGetCurrentPosition"
import { reverseGeocode } from "../../Utils/reverseGeocode"
import DeliveryMap from "./DeliveryMap"
import "./style.css"

const io = require("socket.io-client")
const socket = io("https://tummypolice.iyangi.com")

function Tracking({ location }) {
  const deliveryPartnerId = location.state.response.id
  const [orderDetails, setOrderDetails] = useState([])
  const [address, setAddress] = useState("")
  const [orderConfirmation, setOrderConfirmation] = useState(false)
  const [orderPikedUp, setOrderPikedUp] = useState(false)
  const [orderDelivered, setOrderDelivered] = useState(false)
  const [deliveryPartnerLocation, setDeliveryPartnerLocation] = useState({})
  const [usersLocation, setUsersLocation] = useState({})

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const location = await promisifiedGetCurrentPosition()
      setDeliveryPartnerLocation(location)
      socket.emit("update location", location)
    }, 10000)
    return () => clearInterval(intervalId)
  }, [])

  socket.emit("active delivery partner", deliveryPartnerId)

  let exist = socket.hasListeners("new task")
  if (!exist) {
    socket.on("new task", function(orders) {
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
      setUsersLocation(location)
      const fetchAddress = async () => {
        setAddress(await reverseGeocode(location))
      }
      fetchAddress()
    })
  }

  const confirmOrder = order => {
    setOrderConfirmation(true)
    socket.emit("task accepted", order.orderId)
  }

  const pickupOrder = order => {
    setOrderPikedUp(true)
    socket.emit("order pickedup", {
      orderId: order.orderId,
      deliveryPartnerId
    })
  }

  const deliverOrder = order => {
    setOrderDelivered(true)
    socket.emit("order delivered", {
      orderId: order.orderId,
      deliveryPartnerId
    })
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
          <p>Customer Address: {address.LongLabel}</p>

          {orderConfirmation ? (
            <h2>Order Accepted</h2>
          ) : (
            <button className="confirmBtn" onClick={() => confirmOrder(order)}>
              Accept Order
            </button>
          )}
          {orderPikedUp ? (
            <h2>Order Pickedup</h2>
          ) : (
            <button className="confirmBtn" onClick={() => pickupOrder(order)}>
              Pick up Order
            </button>
          )}
          {orderDelivered ? (
            <h2> Order Delivered </h2>
          ) : (
            <button className="confirmBtn" onClick={() => deliverOrder(order)}>
              Deliver Order
            </button>
          )}
        </div>
      ))}
      {orderConfirmation &&
        deliveryPartnerLocation.latitude !== undefined &&
        deliveryPartnerLocation.longitude !== undefined && (
          <div>
            <DeliveryMap
              usersLocation={usersLocation}
              deliveryPartnerLocation={deliveryPartnerLocation}
            />
          </div>
        )}
    </div>
  )
}

export default Tracking
