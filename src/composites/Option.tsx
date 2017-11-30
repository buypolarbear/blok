import * as React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Text from "../components/Text";
import Icon from "../components/Icon";
import GradientBlock from "../components/GradientBlock";
import { TICKER, COLOR } from "../services/enums";
import { tickerToString } from "../services/utilities";
import { green } from "../style/color";

// --- types --- //
export interface Props {
  type: TICKER;
  selected: boolean;
  onPress?: () => void;
}

// --- styling --- //
const Gradient: any = styled(GradientBlock)`
  height: 50px;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 15px;
  margin-bottom: 20px;
  position: relative;
`;

const SelectedOverlay = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  border-width: 1px;
  border-radius: 3px;
  border-color: ${green};
`;

class Option extends React.Component<Props, {}> {
  // --- render --- //
  render() {
    const { type, selected, ...props } = this.props;
    let icon = null;
    let width = "";
    let height = "";
    switch (type) {
      case TICKER.BTC:
        icon = require("../../assets/images/icon-btc-alt.png");
        width = "17.65px";
        height = "26px";
        break;
      case TICKER.LTC:
        icon = require("../../assets/images/icon-ltc-alt.png");
        width = "18px";
        height = "21px";
        break;
      case TICKER.ETH:
        icon = require("../../assets/images/icon-eth-alt.png");
        width = "16.7px";
        height = "26px";
        break;
      case TICKER.XRP:
        icon = require("../../assets/images/icon-xrp-alt.png");
        width = "20px";
        height = "22px";
        break;
      case TICKER.DASH:
        icon = require("../../assets/images/icon-dash-alt.png");
        width = "20px";
        height = "13px";
        break;
      case TICKER.STEEM:
        icon = require("../../assets/images/icon-steem-alt.png");
        width = "20px";
        height = "20px";
        break;
      default:
        icon = require("../../assets/images/icon-btc-alt.png");
        width = "17.65px";
        height = "26px";
    }
    return (
      <TouchableOpacity {...props}>
        <Gradient>
          <Text color={selected ? COLOR.green : COLOR.lightGrey}>{tickerToString(type)}</Text>
          <Icon source={icon} width={width} height={height} />
          {selected && <SelectedOverlay />}
        </Gradient>
      </TouchableOpacity>
    );
  }
}

export default Option;
