/* @flow */
import React, { Component } from "react";
import styled from "styled-components/native";
import LinearGradient from "react-native-linear-gradient";
import Text from "./Text";
import { purple, lightPurple } from "../style/color";

// -- types ----------------------------------------------------------------- //

// -- styling --------------------------------------------------------------- //
const Card = styled(LinearGradient)`
  width: 100%;
  height: 60px;
  border-radius: 4px;
  shadow-opacity: 0.05;
  shadow-color: #000000;
  shadow-offset: 0px 8px;
  shadow-radius: 7px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

class GradientBlock extends Component<{}> {
  // -- render -------------------------------------------------------------- //
  render() {
    return (
      <Card colors={[lightPurple, purple]} start={{ x: 0.0, y: 0.5 }} end={{ x: 1.0, y: 0.5 }}>
        <Text>Test</Text>
      </Card>
    );
  }
}

export default GradientBlock;
