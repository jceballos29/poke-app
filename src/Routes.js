import React from "react";
import { Route, Switch } from "react-router-dom";
import Pokedex from "./components/Pokedex";
import SingIn from "./components/SingIn";
import { ProtectedRoute } from "./ProtectedRoute";

function Routes() {
  return (
    <Switch>
      <ProtectedRoute path="/pokedex">
        <Pokedex />
      </ProtectedRoute>
      <Route path="/">
        <SingIn />
      </Route>
    </Switch>
  );
}

export default Routes;
