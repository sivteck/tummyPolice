import React, { useContext } from "react"
import { CartContext } from "../Cart/CartContext"
import Itemimg from "../../images/item.webp"

const Item = props => {
  const [, dispatch] = useContext(CartContext)

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", props: props })
  }

  const { name, category, price } = props

  return (
    <div className="item">
      <img src={Itemimg} alt="Menu Item" />
      <h3>{name}</h3>
      <h5>{category}</h5>
      <h4>{price}</h4>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  )
}
export default Item
