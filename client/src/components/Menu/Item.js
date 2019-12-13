import React, { useContext } from "react"
import { CartContext } from "../Cart/CartContext"
import Itemimg from "../../images/item.webp"
import { useParams } from "react-router-dom"
import { ADD_TO_CART } from "../../Reducers/Actions"

const Item = props => {
  const [cart, dispatch] = useContext(CartContext)
  const { id } = useParams()

  const addToCart = () => {
    console.log("cart from item component", cart)
    console.log(id)
    dispatch({ type: ADD_TO_CART, props: props, id: id })
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
