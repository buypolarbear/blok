/* @flow */
import React, { Component } from "react";
import { observer, inject } from "mobx-react/native";
import { Router as ReactRouter, Switch, Route } from "react-router-native";
import Dashboard from "./_dashboard";

// -- types ----------------------------------------------------------------- //
type Props = {
  router: Object
};

class Router extends Component<Props> {
  // -- render -------------------------------------------------------------- //
  render() {
    const { router } = this.props;
    return (
      <ReactRouter history={router.history}>
        <Switch location={router.location}>
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </ReactRouter>
    );
  }
}

export default inject("router")(observer(Router));
