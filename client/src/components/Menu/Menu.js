import React, { useState, useEffect } from "react"
import Item from "./Item"
import Cart from "../Cart/Cart"
import { CartProvider } from "../Cart/CartContext"
import { useParams } from "react-router-dom"
import URL from "../../config"
import CheckStatus from "../Checkstatus/CheckStatus"
import MenuItems from "./MenuItems"

const Menu = props => {
  const [menuItems, setMenuItems] = useState([])
  const [isStatusOk, setStatusOk] = useState(true)

  const { id } = useParams()

  const fetchData = async () => {
    try {
      let res = await fetch(`${URL}/menu?restaurantid=${id}`)
      let result = await res.json()
      setStatusOk(res.ok)
      setMenuItems(result)
    } catch (error) {
      setStatusOk(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CartProvider>
      <CheckStatus status={isStatusOk} />
      <div className="menu">
        <div className="menuComponents1">
          <MenuItems menuItems={menuItems} id={id} key={id} />
        </div>
        <div className="menuComponents2">
          <Cart />
        </div>
      </div>
    </CartProvider>
  )
}

export default Menu
