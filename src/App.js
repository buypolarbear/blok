/* @flow */
import React, { Component } from "react";
import { Provider } from "mobx-react/native";
import Router from "./routes";
import state from "./state";

class App extends Component<{}> {
  // -- render -------------------------------------------------------------- //
  render() {
    return (
      <Provider {...state}>
        <Router />
      </Provider>
    );
  }
}

export default App;
