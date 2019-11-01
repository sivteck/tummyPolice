import React, { useContext, useEffect } from "react"
import { CartContext } from "./CartContext"
import Itemimg from "./images/item.webp"

const Item = props => {
  const [cartItems, setCartItems] = useContext(CartContext)
  console.log("cartItems",cartItems)

  const addToCart = () => {
    let key= props.id
    if(key in cartItems.cart){
      console.log(key)
      let {quantity, price} = cartItems.cart[key]
      quantity += 1
      price = props.price * quantity
      console.log(quantity, price)
      let cartValue = { restaurantId: props.restaurantId, cart: Object.assign(cartItems.cart,{[props.id] :{ "name": props.name, "price": price, "quantity" : quantity}})}
      setCartItems(cartValue)
    }
  // let items = Object.assign(cartItems.cart,{[props.id] :{ "name": props.name, "price": props.price, "quantity" : props.quantity}})
 else{
  let cartValue = { restaurantId: props.restaurantId, cart: Object.assign(cartItems.cart,{[props.id] :{ "name": props.name, "price": props.price, "quantity" : props.quantity}})
}
  setCartItems(cartValue)
   }   // const items = cart.cart.map(item => {
    //   if (item.id === props.id) {
    //     item.quantity += props.quantity
    //     item.price =
    //       (item.price / (item.quantity - props.quantity)) * item.quantity
    //   }
    //   return item
    // })
 
    // setCart({"restaurantId": props.restaurantId, "cart":items})
    // if (cart.cart.filter(item => item.id === props.id).length === 0) {
    //   // console.log("hgkhj,")
    //   const item = {
    //     id: props.id,
    //     name: props.name,
    //     price: props.price,
    //     quantity: props.quantity
    //   }
    //   // console.log("hgkhj,", item)
    //   cart.cart.push(item)
    //   setCart(cart)
    // }

    // // console.log({"restaurantId": props.restaurantId, "cart": cart})
  }

  useEffect(() => {
    fetch("http://tummypolice.iyangi.com/api/v1/cart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"restaurantId": props.restaurantId, "cart": cartItems.cart})
    })
      .then(resp => resp.json())
      .then(() => {})
  }, [cartItems])
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
