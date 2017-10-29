/* @flow */
import React, { Component } from "react";
import styled from "styled-components/native";
import CryptoSymbol from "../components/CryptoSymbol";
import GradientBlock from "../components/GradientBlock";
import Text from "../components/Text";

// -- types ----------------------------------------------------------------- //
type Props = {
  type: "BTC" | "LTC" | "ETH" | "XRP" | "DASH" | "STEEM"
};

// -- styling --------------------------------------------------------------- //
const Balance = styled.View`
  margin-left: 20px;
  justify-content: center;
`;

class AccountCard extends Component<Props> {
  // -- default props ------------------------------------------------------- //
  static defaultProps = {};

  // -- methods ------------------------------------------------------------- //

  // -- render -------------------------------------------------------------- //
  render() {
    const { type, ...props } = this.props;
    let icon = null;
    switch (type) {
      case "BTC":
        icon = require("../../assets/images/icon-btc.png");
        break;
      case "LTC":
        icon = require("../../assets/images/icon-ltc.png");
        break;
      case "ETH":
        icon = require("../../assets/images/icon-eth.png");
        break;
      case "XRP":
        icon = require("../../assets/images/icon-xrp.png");
        break;
      case "DASH":
        icon = require("../../assets/images/icon-dash.png");
        break;
      case "STEEM":
        icon = require("../../assets/images/icon-steem.png");
        break;
      default:
        icon = require("../../assets/images/icon-btc.png");
    }
    return (
      <GradientBlock {...props}>
        <CryptoSymbol src={icon} />
        <Balance>
          <Text>{`0.20986534 ${type}`}</Text>
          <Text size="small" color="grey">
            $48.00
          </Text>
        </Balance>
      </GradientBlock>
    );
  }
}

export default AccountCard;
