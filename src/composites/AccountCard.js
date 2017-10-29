/* @flow */
import React, { Component } from "react";
import CryptoSymbol from "../components/CryptoSymbol";
import GradientBlock from "../components/GradientBlock";

// -- types ----------------------------------------------------------------- //

// -- styling --------------------------------------------------------------- //

class AccountCard extends Component<{}> {
  // -- default props ------------------------------------------------------- //
  static defaultProps = {};

  // -- methods ------------------------------------------------------------- //

  // -- render -------------------------------------------------------------- //
  render() {
    const { ...props } = this.props;
    return (
      <GradientBlock {...props}>
        <CryptoSymbol />
      </GradientBlock>
    );
  }
}

export default AccountCard;
