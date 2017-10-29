/* @flow */
import React, { Component } from "react";
import { Route } from "react-router-native";
import { inject, observer } from "mobx-react/native";
import Background from "../components/Background";
import AccountsView from "../views/AccountsView";
import TransactionsView from "../views/TransactionsView";
import SettingsView from "../views/SettingsView";
import Navigation from "../composites/Navigation";
import DashboardRouteAnimation from "../components/DashboardRouteAnimation";

// -- types ----------------------------------------------------------------- //
type Props = {
  router: Object
};

class Dashboard extends Component<Props> {
  // -- render -------------------------------------------------------------- //
  render() {
    const { router } = this.props;
    return (
      <Background>
        <DashboardRouteAnimation location={router.location}>
          <Route exact path="/" component={AccountsView} />
          <Route path="/transactions" component={TransactionsView} />
          <Route path="/settings" component={SettingsView} />
        </DashboardRouteAnimation>
        <Navigation />
      </Background>
    );
  }
}

export default inject("router")(observer(Dashboard));
