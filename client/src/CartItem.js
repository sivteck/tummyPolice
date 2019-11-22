import React, { useContext, useEffect } from "react"
import { CartContext } from "./CartContext"

function CartItem(props) {
  const [cart, dispatch] = useContext(CartContext)

  const fetchData = async () => {
    console.log("from item com p", cart)
    try {
      let res = await fetch("https://tummypolice.iyangi.com/api/v1/cart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          restaurantId: cart.restaurantId,
          cartItems: cart.cartItems
        })
      })
      let result = await res.json()
      // setFetchStatus(res.ok)
      console.log("result", result)
      // console.log('res', res.ok)
    } catch (error) {
      console.log(error)
    }
  }

  fetchData()

  console.log("props from cart item", props)
  return (
    <div className="cartItem">
      <div> {props.name}</div>
      <div className="changeQuantity" id={props.id}>
        <button
          onClick={event =>
            dispatch({
              type: "DECREMENT_ITEM",
              id: event.target.parentElement.id
            })
          }
        >
          -
        </button>
        <div> {props.quantity}</div>
        <button
          onClick={event =>
            dispatch({
              type: "INCREMENT_ITEM",
              id: event.target.parentElement.id
            })
          }
        >
          +
        </button>
      </div>
      <div> &#8377; {props.price}</div>
    </div>
  )
}

export default CartItem
