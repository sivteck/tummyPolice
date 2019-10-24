import React, { useContext } from 'react'
import { CartContext } from './CartContext'
import Itemimg from './images/item.webp'


 export const Item = (props) => {
  const [cart, setCart] = useContext(CartContext)

  const addToCart = () => {
    const item = { name: props.name, price: props.price }
    console.log(setCart)
    setCart(currentState => [...currentState, item])
  }
  
  return (
    <div class="item">
      <img src= {Itemimg}/>
      <h3>{props.name}</h3>
      <h5>{props.category}</h5>
      <h4>{props.price}</h4>
      <button onClick={addToCart}>Add to cart</button>
      </div>
  )
}
export default Item