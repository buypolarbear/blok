/* @flow */
import React, { Component } from "react";
import styled from "styled-components/native";

// -- types ----------------------------------------------------------------- //

// -- styling --------------------------------------------------------------- //
const Container = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  shadow-opacity: 0.03;
  shadow-color: #000000;
  shadow-offset: 0px 5px;
  shadow-radius: 5px;
  elevation: 2;
`;

const Icon = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

class CryptoSymbol extends Component<{}> {
  // -- methods ------------------------------------------------------------- //

  // -- render -------------------------------------------------------------- //
  render() {
    const { ...props } = this.props;
    return (
      <Container>
        <Icon source={require("../../assets/images/icon-btc.png")} {...props} />
      </Container>
    );
  }
}

export default CryptoSymbol;
