import React, { useReducer, createContext } from "react"
import {
  SET_CART,
  ADD_TO_CART,
  INCREMENT_ITEM,
  DECREMENT_ITEM
} from "../../Reducers/Actions"
import {
  incrementItem,
  addToCart,
  decrementItem
} from "../../Reducers/Reducers"

export const CartContext = createContext()

const reducer = (cart, action) => {
  switch (action.type) {
    case SET_CART:
      return action.data
    case ADD_TO_CART:
      return addToCart(cart, action.props, action.id)
    case INCREMENT_ITEM:
      return incrementItem(cart, action.id)
    case DECREMENT_ITEM:
      return decrementItem(cart, action.id)
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
