import React, {useState} from 'react'

export const CartContext = React.createContext()

export const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState({cart:{}})
  return (
    <CartContext.Provider value={[cartItems, setCartItems]} >
      {props.children}
    </CartContext.Provider>
  )
}