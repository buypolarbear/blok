import * as React from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import Text from "../components/Text";
import ButtonOption from "../components/ButtonOption";
import { TICKER } from "../services/enums";

// --- types --- //
export interface Props {}

export interface State {
  selected: TICKER;
}

// --- styling --- //
const Container = styled.View`
  width: 100%;
  height: 100%;
`;

const OptionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

const Title = styled(Text)`
  margin-bottom: 20px;
`;

const Option = styled(ButtonOption)`
  width: 31%;
  margin-bottom: 3.5%;
`;

class AddAccount extends React.Component<Props, State> {
  // --- default props --- //
  static defaultProps: Partial<Props> = {};

  // --- state --- //
  state = {
    selected: null
  };

  // --- methods --- //

  // --- render --- //

  render() {
    const { ...props } = this.props;
    const { selected } = this.state;
    return (
      <Container {...props}>
        <Title shadow>Account Type</Title>
        <OptionContainer>
          <Option
            selected={selected === TICKER.BTC}
            onPress={() =>
              this.setState({
                selected: TICKER.BTC
              })
            }
          >
            BTC
          </Option>
          <Option
            selected={selected === TICKER.ETH}
            onPress={() =>
              this.setState({
                selected: TICKER.ETH
              })
            }
          >
            ETH
          </Option>
          <Option
            selected={selected === TICKER.LTC}
            onPress={() =>
              this.setState({
                selected: TICKER.LTC
              })
            }
          >
            LTC
          </Option>
          <Option
            selected={selected === TICKER.XRP}
            onPress={() =>
              this.setState({
                selected: TICKER.XRP
              })
            }
          >
            XRP
          </Option>
          <Option
            selected={selected === TICKER.DASH}
            onPress={() =>
              this.setState({
                selected: TICKER.DASH
              })
            }
          >
            DASH
          </Option>
          <Option
            selected={selected === TICKER.STEEM}
            onPress={() =>
              this.setState({
                selected: TICKER.STEEM
              })
            }
          >
            STEEM
          </Option>
        </OptionContainer>
        <Title shadow>Account Details</Title>
      </Container>
    );
  }
}

export default AddAccount;
