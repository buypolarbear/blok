/* @flow */
import React, { Component } from "react";
import styled from "styled-components/native";
import CryptoSymbol from "../components/CryptoSymbol";
import GradientBlock from "../components/GradientBlock";
import Text from "../components/Text";
import TouchableIcon from "../components/TouchableIcon";

// -- types ----------------------------------------------------------------- //
type Props = {
  type: "BTC" | "LTC" | "ETH" | "XRP" | "DASH" | "STEEM"
};

// -- styling --------------------------------------------------------------- //
const Balance = styled.View`
  margin-left: 20px;
  justify-content: center;
  flex: 1;
`;

const QrCode = styled(TouchableIcon)`
  margin-top: 6px;
`;

class AccountCard extends Component<Props> {
  // -- default props ------------------------------------------------------- //
  static defaultProps = {};

  // -- methods ------------------------------------------------------------- //
  onShowQr = () => console.warn("Show Qr");

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
        <QrCode
          src={require("../../assets/images/icon-qr-code.png")}
          width="28px"
          height="28px"
          onPress={this.onShowQr}
        />
      </GradientBlock>
    );
  }
}

export default AccountCard;
