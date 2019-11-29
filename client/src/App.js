import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Homepage from "./Homepage"
import RestaurantList from "./RestaurantList"
import Menu from "./Menu"
import Checkout from "./Checkout"
import Cart from "./Cart"
import Login from "./Login"
import Signup from "./Signup"
import Tracking from "./delivery executive app/Tracking"
import Map from "./delivery executive app/Map"

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/restaurant" component={RestaurantList} />
          <Route exact path="/restaurant/:id" component={Menu} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/deliverypartner/tracking" component={Tracking} />
          <Route exact path="/order/track" component={Map} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
