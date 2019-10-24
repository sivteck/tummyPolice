import React, { Component } from 'react'
import { render } from 'react-dom'
import './style.css'
import { Item} from './Item'
import { Cart } from './Cart'
import { CartProvider } from './CartContext'

const Menu = (props) => {
  console.log("hkhkj",props)
  return (
    <CartProvider>
      <div class="menu">
       <div class = "menuComponents1"> 
       <div class="itemList">
      {
        props.menuItems.map(item => (
          <Item name={item.name} category= {item.category} ingredients= {item.ingredients} veg= {item.vegetarian}price={item.price} key={item.id} />
        ))
      }
    </div> 
     </div>
       <div class = "menuComponents2"> <Cart /> </div>
      </div>
    </CartProvider>
  )
}

export default Menu
