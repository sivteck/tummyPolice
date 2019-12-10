import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Homepage from "./components/Homepage/Homepage"
import RestaurantList from "./components/RestaurantList"
import Menu from "./components/Menu"
import Checkout from "./components/Checkout"
import Cart from "./components/Cart"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Tracking from "./components/delivery executive app/Tracking"
import Map from "./components/delivery executive app/Map"
import ErrrorPage from "./components/ErrrorPage"

function Routes() {
  return (
    <Router>
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
        <Route exact path="/errorpage" component={ErrrorPage} />
      </Switch>
    </Router>
  )
}

export default Routes
