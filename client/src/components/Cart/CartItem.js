import React, { useContext, useEffect } from "react"
import { CartContext } from "./CartContext"
import URL from "../../config"

function CartItem(props) {
  const [cart, dispatch] = useContext(CartContext)

  const fetchData = async () => {
    console.log("from item com p", cart)
    try {
      let res = await fetch(`${URL}cart`, {
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
      await res.json()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [cart])

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
