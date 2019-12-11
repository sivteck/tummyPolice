import React, { useReducer, createContext } from "react"
import {
  incrementItem,
  addToCart,
  decrementItem
} from "../../Reducers/Reducers"

export const CartContext = createContext()

const reducer = (cart, { type, data, props, id }) => {
  switch (type) {
    case "SET_CART":
      return data
    case "ADD_TO_CART":
      return addToCart(cart, props)
    case "INCREMENT_ITEM":
      return incrementItem(cart, id)
    case "DECREMENT_ITEM":
      return decrementItem(cart, id)
    default:
      return cart
  }
}

export const CartProvider = props => {
  const [cart, dispatch] = useReducer(reducer, { cartItems: {} })

  return (
    <CartContext.Provider value={[cart, dispatch]}>
      {props.children}
    </CartContext.Provider>
  )
}
