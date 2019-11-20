import React, { useState, useReducer, useContext } from "react"
import {incrementItem, addToCart, decrementItem} from './Reducers'

export const CartContext = React.createContext()

// const initialState = 

const reducer = (cart, action) => {
  console.log("cart", cart)
  console.log("action.data", action.data)
  switch(action.type){
    case 'SET_CART' : return  action.data//{...cart, cartItems: action.data.cartItems}
    case 'INCREMENT_ITEM' : return incrementItem(cart, action.id)
    case 'DECREMENT_ITEM' : return decrementItem(cart, action.id)
    case 'ADD_TO_CART' : return addToCart(cart, action.props)
    default : return cart
  }
}

export const CartProvider = props => {
  const [cart,dispatch] = useReducer(reducer, {cartItems: {} })
  return (
    <CartContext.Provider value={[cart,dispatch]}>
      {props.children}
    </CartContext.Provider>
  )
}
