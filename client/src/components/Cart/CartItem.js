import React, { useContext } from "react"
import { CartContext } from "./CartContext"
import { INCREMENT_ITEM, decrementItemAction } from "../../Reducers/Actions"

function CartItem({ item }) {
  const [cart, dispatch] = useContext(CartContext)
  console.log("post req", cart)

  return (
    <div className="cartItem">
      <div> {item.name}</div>
      <div className="changeQuantity" id={item.itemId}>
        <button
          onClick={event => {
            decrementItemAction(cart, dispatch, event.target.parentElement.id)
          }}
        >
          -
        </button>
        <div> {item.quantity}</div>
        <button
          onClick={event =>
            dispatch({
              type: INCREMENT_ITEM,
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
