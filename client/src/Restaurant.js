import React from 'react'
import { Item } from './Item'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Menu from './Menu'

 export const Restaurant = (props) => {
    console.log(props.name)
   
    return (
      <Router>
        <Link to ="/menu">
        <div class="restaurant" >
            <div class= "rest">
                <img src={props.img} width = "254" height="160" />
                <div>{props.name}</div>
            </div>
{/*         
           <div class="itemList">
      {
        props.menu.map(item => (
          <Item name={item.name} category= {item.category} ingredients= {item.ingredients} veg= {item.vegetarian}price={item.price} key={item.id} />
        ))
      }
    </div> */}
        </div>
        </Link>
        <Switch>
          <Route path= "/menu">
          <div class="itemList">
            <Menu menuItems={props.menu}/>
      {/* {
        props.menu.map(item => (
          <Item name={item.name} category= {item.category} ingredients= {item.ingredients} veg= {item.vegetarian}price={item.price} key={item.id} />
        ))
      } */}
    </div>
            </Route>
            </Switch>

</Router>    )
}

// export default Restaurant