/* @flow */
import React, { Component } from "react";
import { Text } from "react-native";
import { Provider } from "mobx-react/native";
import state from "./state";
import Background from "./components/Background";

class App extends Component<{}> {
  // -- render -------------------------------------------------------------- //
  render() {
    return (
      <Provider {...state}>
        <Background>
          <Text>Hello World</Text>
        </Background>
      </Provider>
    );
  }
}

export default App;
