import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Homepage from "./Homepage";
import RestaurantList from "./RestaurantList";
import Menu from "./Menu";
import Checkout from "./Checkout"
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/restaurant" component={RestaurantList} />
          <Route exact path="/restaurant/:id" component={Menu} />
          <Route exact path="/checkout" component={Checkout} />
       
        </Switch>
      </div>
    </Router>
  );
}

export default App;
