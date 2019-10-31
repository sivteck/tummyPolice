import React, { useContext, useEffect, useState } from 'react'
import { CartContext, CartProvider } from "./CartContext";
import Cart from './Cart'

const Checkout = () => {
    const dataset = []
  
    const [checkout, setCheckout] = useState({cart:[]})

    async function fetchData() { 
        try {
         let res = await fetch("http://tummypolice.iyangi.com/api/v1/checkout")
         let data = await  res.json()
         setCheckout(data) 
        } catch (error) {
          console.log(error)
        }
          } 
    useEffect(() => {fetchData()}, [])
    // let items = checkout.cart
    console.log(checkout.cart)

    return (
        <CartProvider>
        <div>
            {/* <h1>{items}</h1> */}
          {checkout.cart.map(item => (
            <div className="cartItem">
              <div> {item.name}</div>
              <div> {item.quantity}</div>
              <div> &#8377; {item.price}</div>
            </div>
          ))}
            {/* <Cart /> */}
        </div>
        </CartProvider>
        
    )
}

export default Checkout
