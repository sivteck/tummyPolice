import React, { useReducer, createContext } from "react"
import {
  incrementItem,
  addToCart,
  decrementItem
} from "../../Reducers/Reducers"

export const CartContext = createContext()

const reducer = (cart, action) => {
  switch (action.type) {
    case "SET_CART":
      return action.data
    case "ADD_TO_CART":
      return addToCart(cart, action.props)
    case "INCREMENT_ITEM":
      return incrementItem(cart, action.id)
    case "DECREMENT_ITEM":
      return decrementItem(cart, action.id)
    case "EMPTY_CART":
      return action.data
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
