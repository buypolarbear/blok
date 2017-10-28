/* @flow */
import React, { Component } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Route } from "react-router-native";
import Background from "../components/Background";
import AccountsView from "../views/AccountsView";
import TransactionsView from "../views/TransactionsView";
import SettingsView from "../views/SettingsView";
import Navigation from "../composites/Navigation";

// -- styling --------------------------------------------------------------- //
const Container = styled(View)`
  padding-top: 40px;
  padding-left: 20px;
  padding-right: 20px;
`;

class Dashboard extends Component<{}> {
  // -- render -------------------------------------------------------------- //
  render() {
    return (
      <Background>
        <Container>
          <Route exact path="/" component={AccountsView} />
          <Route path="/transactions" component={TransactionsView} />
          <Route path="/settings" component={SettingsView} />
        </Container>
        <Navigation />
      </Background>
    );
  }
}

export default Dashboard;
