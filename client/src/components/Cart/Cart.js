import React, { useContext, useEffect, useState } from "react"
import { CartContext } from "./CartContext"
import { Link } from "react-router-dom"
import styled from "styled-components"
import CartItem from "./CartItem"
import URL from "../../config"
import CheckStatus from "../Checkstatus/CheckStatus"

const StyledLink = styled(Link)`
  background-color: #db741e;
  color: #fff;
  border: none;
  padding: 15px;
  text-decoration: none;
`

const Cart = () => {
  const [cart, dispatch] = useContext(CartContext)
  const [isStatusOk, setStatusOk] = useState(true)

  async function fetchData() {
    try {
      let response = await fetch(`${URL}cart`)
      let data = await response.json()
      setStatusOk(response.ok)
      if (data.cartItems === undefined) data.cartItems = {}
      dispatch({ type: "SET_CART", data: data })
    } catch (error) {
      setStatusOk(false)
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
    return Object.keys(cartItems).map(itemId => {
      let { name, price, quantity } = cartItems[itemId]
      return <CartItem props={(name, price, quantity, itemId)} />
    })
  }

  return (
    <div>
      <CheckStatus status={isStatusOk} />
      {Object.keys(cart.cartItems).length === 0 ? (
        <div>
          <h1>Cart Empty</h1>
        </div>
      ) : (
        <div>
          <h1>Cart</h1>
          <div>
            {console.log("totalItems", totalItems)}
            {totalItems.length === 1 ? (
              <p>{totalItems} ITEM</p>
            ) : (
              <p>{totalItems}ITEMS</p>
            )}
          </div>
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
