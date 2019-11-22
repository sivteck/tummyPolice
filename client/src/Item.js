import React, { useContext } from "react"
import { CartContext } from "./CartContext"
import Itemimg from "./images/item.webp"

const Item = props => {
  const [_, dispatch] = useContext(CartContext)

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", props: props })
  }

  return (
    <div className="item">
      <img src={Itemimg} />
      <h3>{props.name}</h3>
      <h5>{props.category}</h5>
      <h4>{props.price}</h4>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  )
}
export default Item
