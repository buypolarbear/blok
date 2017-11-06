import * as React from "react";
import styled from "styled-components/native";
import CryptoSymbol from "../components/CryptoSymbol";
import GradientBlock from "../components/GradientBlock";
import Text from "../components/Text";
import TouchableIcon from "./TouchableIcon";
import { TICKER, SIZE, COLOR } from "../services/enums";

// -- types ----------------------------------------------------------------- //
export interface Props {
  type: TICKER;
}

// -- styling --------------------------------------------------------------- //
const Balance = styled.View`
  margin-left: 20px;
  justify-content: center;
  flex: 1;
`;

const QrCode = styled(TouchableIcon)`
  margin-top: 7px;
`;

class AccountCard extends React.Component<Props, {}> {
  // -- methods ------------------------------------------------------------- //
  onShowQr = () => console.warn("Show Qr");

  // -- render -------------------------------------------------------------- //
  render() {
    const { type } = this.props;
    let icon = null;
    switch (type) {
      case TICKER.BTC:
        icon = require("../../assets/images/icon-btc.png");
        break;
      case TICKER.LTC:
        icon = require("../../assets/images/icon-ltc.png");
        break;
      case TICKER.ETH:
        icon = require("../../assets/images/icon-eth.png");
        break;
      case TICKER.XRP:
        icon = require("../../assets/images/icon-xrp.png");
        break;
      case TICKER.DASH:
        icon = require("../../assets/images/icon-dash.png");
        break;
      case TICKER.STEEM:
        icon = require("../../assets/images/icon-steem.png");
        break;
      default:
        icon = require("../../assets/images/icon-btc.png");
    }
    return (
      <GradientBlock>
        <CryptoSymbol src={icon} />
        <Balance>
          <Text>{`0.20986534 ${type}`}</Text>
          <Text size={SIZE.small} color={COLOR.grey}>
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
