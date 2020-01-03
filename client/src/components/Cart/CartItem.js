import React, { useContext } from "react"
import { CartContext } from "./CartContext"
import { INCREMENT_ITEM, decrementItemAction } from "../../Reducers/Actions"
import styled from "styled-components"

const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
`

const InnerSection = styled.section``

function CartItem({ item }) {
  const [cart, dispatch] = useContext(CartContext)
  console.log("post req", cart)

  return (
    <Section className="cartItem">
      <InnerSection> {item.name}</InnerSection>
      <InnerSection className="changeQuantity" id={item.itemId}>
        <button
          onClick={async event => {
            await decrementItemAction(
              cart,
              dispatch,
              event.target.parentElement.id
            )
          }}
        >
          -
        </button>
        <div> {item.quantity}</div>
        <button
          onClick={event =>
            dispatch({
              type: INCREMENT_ITEM,
              id: event.target.parentElement.id
            })
          }
        >
          +
        </button>
      </InnerSection>
      <InnerSection> &#8377; {item.price}</InnerSection>
    </Section>
  )
}

export default CartItem
