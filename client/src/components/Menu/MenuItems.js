import React, { useContext, useEffect, useState } from "react"
import { CartContext } from "../Cart/CartContext"
import Item from "./Item"
import URL from "../../config"
import { postRequest } from "../../Utils/postRequest"
import CheckStatus from "../Checkstatus/CheckStatus"

const MenuItems = ({ menuItems, id }) => {
  const [cart, dispatch] = useContext(CartContext)
  const [isStatusOk, setStatusOk] = useState(true)

  const fetchData = async cart => {
    if (!localStorage.getItem("userDetails")) {
      localStorage.setItem("guestSession", JSON.stringify(cart))
    }

    if (Object.keys(cart.cartItems).length !== 0) {
      const data = {
        restaurantId: cart.restaurantId,
        cartItems: cart.cartItems
      }
      const { response, error } = await postRequest(`${URL}/cart`, data)
      if (response) {
        setStatusOk(response.ok)
      }
      if (error) {
        setStatusOk(false)
      }
    }
  }
  useEffect(() => {
    fetchData(cart)
  }, [cart])

  return (
    <div className="itemList">
      <CheckStatus status={isStatusOk} />
      {menuItems.map(item => (
        <Item {...item} restaurantId={id} key={item.id} quantity={1} />
      ))}
    </div>
  )
}

export default MenuItems
