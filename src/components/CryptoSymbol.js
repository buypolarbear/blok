/* @flow */
import React, { Component } from "react";
import styled from "styled-components/native";

// -- types ----------------------------------------------------------------- //

// -- styling --------------------------------------------------------------- //
const Container = styled.View`
  width: 40px;
  height: 40px;
  background: orange;
  border-radius: 20px;
  shadow-opacity: 0.07;
  shadow-color: #000000;
  shadow-offset: 0px 3px;
  shadow-radius: 5px;
  elevation: 2;
`;

class CryptoSymbol extends Component<{}> {
  // -- methods ------------------------------------------------------------- //

  // -- render -------------------------------------------------------------- //
  render() {
    const { ...props } = this.props;
    return <Container {...props} />;
  }
}

export default CryptoSymbol;
