/* @flow */
import React, { Component } from "react";
import { Text } from "react-native";
import Background from "./atoms/Background";

class Index extends Component<{}> {
  // -- render -------------------------------------------------------------- //
  render() {
    return (
      <Background>
        <Text>Hello World</Text>
      </Background>
    );
  }
}

export default Index;
