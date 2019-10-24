import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Homepage from "./Homepage";
import ItemList from "./ItemList";
import Menu from "./Menu";
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/restaurant" component={ItemList} />
          <Route path="/restaurant/:restaurantId" component={Menu} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
