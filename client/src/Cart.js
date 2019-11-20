import React, { useContext, useEffect, useState } from "react"
import { CartContext } from "./CartContext"
import { Link } from "react-router-dom"
import styled from "styled-components"

const StyledLink = styled(Link)`
  background-color: #db741e;
  color: #fff;
  border: none;
  padding: 15px;
  text-decoration: none;
`

const Cart = () => {
  const [cart,dispatch] = useContext(CartContext)
  const [fetchStatus, setFetchStatus] = useState(false)

  const totalPrice = Object.keys(cart.cartItems).reduce(
    (sum, key) => sum + cart.cartItems[key].price,
    0
  )
  const totalItems = Object.keys(cart.cartItems).reduce(
    (sum, key) => sum + cart.cartItems[key].quantity,
    0
  )

  async function fetchData() {
    try {
      let res = await fetch("https://tummypolice.iyangi.com/api/v1/cart")
      let data = await res.json()
      // setCart(data)
      console.log("fetchData", data)
      dispatch({type: 'SET_CART', data: data})
      setFetchStatus(res.ok)
     
     
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  function decQuantity(event) {
    dispatch({type: 'DECREMENT_ITEM' ,id: event.target.parentElement.id
  })
   
  }

  function incQuantity(event) {
    dispatch({type: 'INCREMENT_ITEM' ,id: event.target.parentElement.id
  })
    // setCart(cartValue)
  }

  function renderCartItems(cartItems) {
    return Object.keys(cartItems).map(item => (
      <div className="cartItem">
        <div> {cartItems[item].name}</div>
        <div className="changeQuantity" id={item}>
          <button onClick={decQuantity}>-</button>
          <div> {cartItems[item].quantity}</div>
          <button onClick={incQuantity}>+</button>
        </div>
        <div> &#8377; {cartItems[item].price}</div>
      </div>
    ))
  }

  return { fetchStatus } ? (
    <div>
      {Object.keys(cart.cartItems).length === 0 ? (
        <div>
          <h1>Cart Empty</h1>
        </div>
      ) : (
        <div>
          <h1>Cart</h1>
          {Object.keys(cart.cartItems).length === 1 ? (
            <div>
              <p>{totalItems} ITEM</p>
            </div>
          ) : (
            <div>
              <p>{totalItems} ITEMS</p>
            </div>
          )}

          {renderCartItems(cart.cartItems)}
          <br />
          <br />
          <h4>Subtotal :&#8377;{totalPrice}</h4>
          <br />
          <br />
          <StyledLink to="/checkout">Checkout</StyledLink>
        </div>
      )}
    </div>
  ) : (
    <div>unable to fetch cart</div>
  )
}

export default Cart
