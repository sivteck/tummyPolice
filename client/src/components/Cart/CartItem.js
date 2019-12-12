import React, { useContext, useEffect } from "react"
import { CartContext } from "./CartContext"
import URL from "../../config"

function CartItem({ item }) {
  const [cart, dispatch] = useContext(CartContext)
  console.log("post req", cart)

  return (
    <div className="cartItem">
      <div> {item.name}</div>
      <div className="changeQuantity" id={item.itemId}>
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
        <div> {item.quantity}</div>
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
      <div> &#8377; {item.price}</div>
    </div>
  )
}

export default CartItem
