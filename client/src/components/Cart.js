import React, { useContext, useEffect, useState } from "react"
import { CartContext } from "./CartContext"
import { Link } from "react-router-dom"
import styled from "styled-components"
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
  const [isStatusOk, setStatusOk] = useState(false)

  async function fetchData() {
    try {
      let response = await fetch("https://tummypolice.iyangi.com/api/v1/cart")
      console.log("response", response)
      let data = await response.json()
      setStatusOk(response.ok)
      if (data.cartItems === undefined) data.cartItems = {}
      dispatch({ type: "SET_CART", data: data })
    } catch (error) {
      console.log(error)
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

  return { isStatusOk } ? (
    <div>
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
  ) : (
    <div> Unable to fetch cart</div>
  )
}

export default Cart
