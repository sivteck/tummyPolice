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
import Map from "./components/delivery executive app/Map"
import ErrrorPage from "./components/Checkstatus/ErrrorPage"
import DeliveryPartnerLogin from "./components/delivery executive app/DeliveryPartnerLogin"

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
        <Route
          exact
          path="/deliverypartner/login"
          component={DeliveryPartnerLogin}
        />
      </Switch>
    </Router>
  )
}

export default Routes
