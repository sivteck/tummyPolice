import React, { useContext, useEffect, useState } from "react"
import { CartContext } from "./CartContext"
import Itemimg from "./images/item.webp"

const Item = props => {
  const [cart, setCart] = useContext(CartContext)
  const [fetchStatus, setFetchStatus] = useState(false)

  const addToCart = () => {
    let key = props.id
    if (key in cart.cartItems) {
      let { quantity, price } = cart.cartItems[key]
      quantity += 1
      price = props.price * quantity
      let cartValue = {
        restaurantId: props.restaurantId,
        cartItems: Object.assign(cart.cartItems, {
          [props.id]: { name: props.name, price: price, quantity: quantity }
        })
      }
      setCart(cartValue)
    } else {
      let cartValue = {
        restaurantId: props.restaurantId,
        cartItems: Object.assign(cart.cartItems, {
          [props.id]: {
            name: props.name,
            price: props.price,
            quantity: props.quantity
          }
        })
      }
      setCart(cartValue)
    }
  }

  const fetchData = async () => {
    try {
      let res = await fetch("https://tummypolice.iyangi.com/api/v1/cart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          restaurantId: props.restaurantId,
          cartItems: cart.cartItems
        })
      })
      let result = await res.json()
      setFetchStatus(res.ok)
      // console.log("result",result)
      // console.log('res', res.ok)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [cart])

  return { fetchStatus } ? (
    <div className="item">
      <img src={Itemimg} />
      <h3>{props.name}</h3>
      <h5>{props.category}</h5>
      <h4>{props.price}</h4>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  ) : (
    <div>Unable to fetch items</div>
  )
}
export default Item
