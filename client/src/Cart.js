import React, { useContext, useEffect } from "react"
import { CartContext } from "./CartContext"
import { Link } from "react-router-dom"
import styled from "styled-components"
// import { getRequest } from "./fetchApi"
import CartItem from "./CartItem"

const StyledLink = styled(Link)`
  background-color: #db741e;
  color: #fff;
  border: none;
  padding: 15px;
  text-decoration: none;
`

const Cart = () => {
  const [cart, dispatch] = useContext(CartContext)
  async function fetchData() {
    try {
      let res = await fetch("https://tummypolice.iyangi.com/api/v1/cart")
      let data = await res.json()
      // setCart(data)
      console.log("fetchData", data)
      dispatch({ type: "SET_CART", data: data })
      // setFetchStatus(res.ok)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  let totalPrice = 0
  for (let key in cart.cartItems) totalPrice += cart.cartItems[key].price

  let totalItems = 0
  for (let key in cart.cartItems) totalItems += cart.cartItems[key].quantity

  function renderCartItems(cartItems) {
    return Object.keys(cartItems).map(item => (
      <CartItem
        name={cartItems[item].name}
        price={cartItems[item].price}
        quantity={cartItems[item].quantity}
        id={item}
        key={item}
      />
    ))
  }

  return (
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
  )
}

export default Cart
