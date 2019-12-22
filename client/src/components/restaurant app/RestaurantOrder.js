import React, { useState } from "react"

const io = require("socket.io-client")
const socket = io("https://tummypolice.iyangi.com")

const RestaurantOrder = () => {
  const [orderDetails, setOrderDetails] = useState([
    {
      itemName: "pani puri",
      quantity: 2,
      price: 30,
      customerName: "heena",
      deliveryAddress: "geekskool"
    },
    {
      itemName: "pani puri",
      quantity: 2,
      price: 30,
      customerName: "heena",
      deliveryAddress: "geekskool"
    }
  ])

  socket.on("active order", function(orders) {
    setOrderDetails(...orderDetails, orders)
  })
  //   setOrders([
  //     {
  //       itemName: "pani puri",
  //       quantity: 2,
  //       price: 30,
  //       customerName: "heena",
  //       address: "geekskool"
  //     }
  //   ])

  //   const confirmOrder = () => {
  //       socket.emit('order confirm',)
  //   }

  return (
    <div>
      {orderDetails.map(item => (
        <div
          style={{
            width: "50%",
            border: "2px solid orange",
            padding: "10px",
            margin: "10px auto"
          }}
        >
          <p>Item: {item.itemName}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: {item.price}</p>
          <p>Customer Name: {item.customerName}</p>
          <p>Delivery Address: {item.deliveryAddress}</p>
          {/* <button onClick={confirmOrder}>Confirm Order</button> */}
        </div>
      ))}
    </div>
  )
}

export default RestaurantOrder
