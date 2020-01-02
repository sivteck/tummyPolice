import React, { useContext, useEffect, useState } from "react"
import { CartContext } from "./CartContext"
import { Redirect } from "react-router-dom"
import styled from "styled-components"
import CartItem from "./CartItem"
import URL from "../../config"
import CheckStatus from "../Checkstatus/CheckStatus"
import { SET_CART } from "../../Reducers/Actions"
import { useParams } from "react-router-dom"

const Button = styled.button`
  width: 150px;
  cursor: pointer;
  border: none;
  font-size: 15px;
  font-weight: 600;
  height: 50px;
  color: #fff;
  background-color: #fc8019;
  text-transform: uppercase;
`

const Section = styled.section`
  display: grid;
  grid-template-column: 10% 10% 60% 10% 10%;
`
const H1 = styled.h1`
  font-size: 32px;
  font-weight: 600;
  padding: 10px;
  text-align: left;
`
const H2 = styled.h2`
  font-size: 17px;
  padding: 10px;
`
const InnerSection = styled.section`
  padding: 10px;
`

const Cart = props => {
  const [cart, dispatch] = useContext(CartContext)
  const [isStatusOk, setStatusOk] = useState(true)
  const [checkoutStatus, setCheckoutStatus] = useState(false)

  const { id } = useParams()
  console.log(id)

  console.log(checkoutStatus)

  async function fetchData() {
    try {
      let response = await fetch(`${URL}/cart`)
      let data = await response.json()
      setStatusOk(response.ok)
      if (data.restaurantId === undefined)
        data.restaurantId = props.restaurantId
      if (data.cartItems === undefined) data.cartItems = {}
      dispatch({ type: SET_CART, data: data })
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
      return <CartItem item={{ name, price, quantity, itemId }} key={itemId} />
    })
  }

  const checkout = () => {
    console.log("checkout")
    if (checkoutStatus) {
      console.log("checkout")
      console.log("id", id)
      return (
        <div>
          <Redirect to="/checkout" />
        </div>
      )
    }
  }

  return (
    <div>
      <CheckStatus status={isStatusOk} />
      {Object.keys(cart.cartItems).length === 0 ? (
        <div>
          <h1>Cart Empty</h1>
        </div>
      ) : (
        <Section>
          <H1>Cart</H1>
          <InnerSection>
            {totalItems.length === 1 ? (
              <p>{totalItems} ITEM</p>
            ) : (
              <p>{totalItems} ITEMS</p>
            )}
          </InnerSection>
          <InnerSection>{renderCartItems(cart.cartItems)}</InnerSection>
          <H2>Subtotal :&#8377;{totalPrice}</H2>
          <InnerSection>
            <Button onClick={() => setCheckoutStatus(true)}>Checkout</Button>
          </InnerSection>
        </Section>
      )}
      {checkout()}
    </div>
  )
}

export default Cart
