import * as React from "react";
import { Animated } from "react-native";
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

export interface State {
  showDelete: boolean;
  transition: Animated.Value;
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

const AnimatedAction = Animated.createAnimatedComponent(Action);

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

class AccountCard extends React.Component<Props, State> {
  // --- state --- //
  state = {
    transition: new Animated.Value(1),
    showDelete: false
  };

  // --- methods --- //
  componentWillReceiveProps(newProps: Props) {
    const deleting = newProps.isDeleting;
    if (deleting !== this.props.isDeleting) this.animate(0, deleting);
  }

  componentDidMount() {
    if (this.props.isDeleting) this.setState({ showDelete: true });
  }

  animate = (value: number, state: boolean) =>
    Animated.timing(this.state.transition, {
      duration: 100,
      toValue: value,
      useNativeDriver: true
    }).start(() => {
      this.setState({ showDelete: state });
      if (value === 0) this.animate(1, state);
    });

  onShowQr = () => console.warn("Show Qr");

  // --- render --- //
  render() {
    const { account, onDelete } = this.props;
    const { showDelete, transition } = this.state;
    const actionStyle = {
      transform: [
        {
          scale: transition.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          })
        }
      ]
    };
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
        {showDelete ? (
          <AnimatedAction
            style={actionStyle}
            src={require("../../assets/images/icon-delete.png")}
            width="29px"
            height="29px"
            onPress={() => onDelete(account)}
          />
        ) : (
          <AnimatedAction
            style={actionStyle}
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
