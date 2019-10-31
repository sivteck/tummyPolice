import React, { useContext, useEffect } from "react"
import { CartContext } from "./CartContext"
import Itemimg from "./images/item.webp"

const Item = props => {
  const [cart, setCart] = useContext(CartContext)

  const addToCart = () => {
    const items = cart.map(item => {
      if (item.id === props.id) {
        item.quantity += props.quantity
        item.price =
          (item.price / (item.quantity - props.quantity)) * item.quantity
      }
      return item
    })
    setCart(items)
    if (cart.filter(item => item.id === props.id).length === 0) {
      console.log("hgkhj,")
      const item = {
        id: props.id,
        name: props.name,
        price: props.price,
        quantity: props.quantity
      }
      console.log("hgkhj,", item)
      setCart([...cart, item])
    }

    console.log(cart)
  }

  useEffect(() => {
    fetch("http://tummypolice.iyangi.com/api/v1/cart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cart)
    })
      .then(resp => resp.json())
      .then(() => {})
  }, [cart])
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
