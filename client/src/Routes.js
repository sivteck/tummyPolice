import React from "react";
import App from "./App";
import ItemList from "./ItemList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/">
          <App />
        </Route>
        <Route path="/restaurant">
          <ItemList />
        </Route>
      </Switch>
    </div>
  );
}
