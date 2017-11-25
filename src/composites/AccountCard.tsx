import * as React from "react";
import styled from "styled-components/native";
import CryptoSymbol from "../components/CryptoSymbol";
import GradientBlock from "../components/GradientBlock";
import Text from "../components/Text";
import TouchableIcon from "./TouchableIcon";
import { TICKER, SIZE, COLOR } from "../services/enums";
import { tickerToString, formatBalance, formatMoney } from "../services/utilities";

// --- types --- //
export interface Props {
  account: any;
  isDeleting: boolean;
  onDelete: (account: any) => void;
}

// --- styling --- //
const Balance = styled.View`
  margin-left: 20px;
  justify-content: center;
  flex: 1;
`;

const Action = styled(TouchableIcon)`
  margin-top: 7px;
`;

const Container = styled(GradientBlock)`
  width: 100%;
  height: 60px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

class AccountCard extends React.Component<Props, {}> {
  // --- methods --- //
  onShowQr = () => console.warn("Show Qr");

  // --- render --- //
  render() {
    const { account, isDeleting, onDelete } = this.props;
    let icon = null;
    switch (account.type) {
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
      <Container>
        <CryptoSymbol src={icon} />
        <Balance>
          <Text color={COLOR.lightGrey}>{`${formatBalance(account.balance)} ${tickerToString(
            account.type
          )}`}</Text>
          <Text size={SIZE.small} color={COLOR.grey}>
            ${formatMoney(account.balance * /*TODO currency exchange*/ 7000)}
          </Text>
        </Balance>
        {isDeleting ? (
          <Action
            src={require("../../assets/images/icon-delete.png")}
            width="26px"
            height="26px"
            onPress={() => onDelete(account)}
          />
        ) : (
          <Action
            src={require("../../assets/images/icon-qr-code.png")}
            width="28px"
            height="28px"
            onPress={this.onShowQr}
          />
        )}
      </Container>
    );
  }
}

export default AccountCard;
