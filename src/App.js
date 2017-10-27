/* @flow */
import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Provider } from "mobx-react/native";
import Router from "./routes";
import state from "./state";

class App extends Component<{}> {
  // -- render -------------------------------------------------------------- //
  render() {
    return [
      <StatusBar barStyle="light-content" key="statusbar" />,
      <Provider {...state} key="provider">
        <Router />
      </Provider>
    ];
  }
}

export default App;
