import React, { useState, useEffect } from "react"
import "./style.css"
import Item from "./Item"
import Cart from "./Cart"
import { CartProvider } from "./CartContext"
import { useParams } from "react-router-dom"

const Menu = props => {
  const menu = []
  const [menuItems, setMenuItems] = useState(menu)
  const [fetchStatus, setFetchStatus] = useState(false)

  const { id } = useParams()

  const fetchData = async () => {
    try {
      let res = await fetch(
        `https://tummypolice.iyangi.com/api/v1/menu?restaurantid=${id}`
      )
      let result = await res.json()
      setFetchStatus(res.ok)
      setMenuItems(result)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { fetchStatus } ? (
    <CartProvider>
      <div className="menu">
        <div className="menuComponents1">
          <div className="itemList">
            {menuItems.map(item => (
              <Item
                {...item}
                restaurantId={id}
                // id={item.id}
                // name={item.name}
                // category={item.category}
                // ingredients={item.ingredients}
                // veg={item.vegetarian}
                // price={item.price}
                key={item.id}
                quantity={1}
              />
            ))}
          </div>
        </div>
        <div className="menuComponents2">
          <Cart />
        </div>
      </div>
    </CartProvider>
  ) : (
    <div>Unable to fetch cart</div>
  )
}

export default Menu
