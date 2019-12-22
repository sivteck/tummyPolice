import React, { useContext, useEffect } from "react"
import { CartContext } from "../Cart/CartContext"
import Item from "./Item"
import URL from "../../config"

const MenuItems = ({ menuItems, id }) => {
  const [cart, dispatch] = useContext(CartContext)

  const fetchData = async cart => {
    console.log("fetchData")
    console.log(
      " 1st console items in cart",
      Object.keys(cart.cartItems).length
    )
    if (Object.keys(cart.cartItems).length !== 0) {
      console.log(
        "2nd consoleitems in cart",
        Object.keys(cart.cartItems).length
      )
      try {
        let res = await fetch(`${URL}/cart`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            restaurantId: cart.restaurantId,
            cartItems: cart.cartItems
          })
        })
        let result = await res.json()
        console.log("cart from menuItems", result)
      } catch (error) {
        console.log(error)
      }
    }
  }
  useEffect(() => {
    fetchData(cart)
  }, [cart])

  return (
    <div className="itemList">
      {menuItems.map(item => (
        <Item {...item} restaurantId={id} key={item.id} quantity={1} />
      ))}
    </div>
  )
}

export default MenuItems
