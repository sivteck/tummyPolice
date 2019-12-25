import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Homepage from "./components/Homepage/Homepage"
import RestaurantList from "./components/Restaurant/RestaurantList"
import Menu from "./components/Menu/Menu"
import Checkout from "./components/Checkout/Checkout"
import Cart from "./components/Cart/Cart"
import Login from "./components/Login/Login"
import Signup from "./components/Register/Signup"
import Tracking from "./components/delivery executive app/Tracking"
import Map from "./components/Tracking/Map"
import ErrrorPage from "./components/Checkstatus/ErrrorPage"
import DeliveryPartnerLogin from "./components/delivery executive app/DeliveryPartnerLogin"
import RestaurantLogin from "./components/restaurant app/RestaurantLogin"
import RestaurantOrder from "./components/restaurant app/RestaurantOrder"

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/restaurant" component={RestaurantList} />
        <Route path="/restaurant/:id" component={Menu} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        <Route path="/deliverypartner/tracking" component={Tracking} />
        <Route path="/order/track" component={Map} />
        <Route path="/errorpage" component={ErrrorPage} />
        <Route path="/restaurantapp/login" component={RestaurantLogin} />
        <Route path="/deliverypartner/login" component={DeliveryPartnerLogin} />
        <Route path="/restaurantapp/order" component={RestaurantOrder} />
      </Switch>
    </Router>
  )
}

export default Routes
