/* @flow */
import React, { Component } from "react";
import styled from "styled-components/native";
import LinearGradient from "react-native-linear-gradient";
import { purple, lightPurple } from "../style/color";

// -- types ----------------------------------------------------------------- //
type Props = {
  children: React$Node
};

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
  elevation: 2;
`;

class GradientBlock extends Component<Props> {
  // -- render -------------------------------------------------------------- //
  render() {
    const { children, ...props } = this.props;
    return (
      <Card
        colors={[lightPurple, purple]}
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 1.0, y: 0.5 }}
        {...props}
      >
        {children}
      </Card>
    );
  }
}

export default GradientBlock;
