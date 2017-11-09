import * as React from "react";
import styled from "styled-components/native";
import { inject } from "mobx-react/native";
import TouchableText from "../composites/TouchableText";
import Text from "../components/Text";
import ButtonOption from "../components/ButtonOption";
import { COLOR, TICKER } from "../services/enums";
import Separator from "../components/Separator";
import { isIphoneX } from "../services/utilities";
import { RouterInterface } from "../store/_router";

// --- types --- //
export interface Props {
  router?: RouterInterface;
}

export interface State {
  selected: TICKER;
}

// --- styling --- //
const Container = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
`;

const OptionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 40px;
  padding-left: 3px;
  padding-right: 3px;
  margin-left: -3px;
  margin-right: -3px;
`;

const ButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  position: absolute;
  bottom: 0;
  padding-bottom: ${isIphoneX() ? "35px" : "30px"};
`;

const Title = styled(Text)`
  margin-bottom: 20px;
`;

const Option = styled(ButtonOption)`
  width: 31%;
  margin-bottom: 3.5%;
`;

const ButtonSeparator = styled(Separator)`
  margin-bottom: 30px;
`;

@inject("router")
class AddAccount extends React.Component<Props, State> {
  // --- state --- //
  state = {
    selected: null
  };

  // --- methods --- //

  // --- render --- //
  render() {
    const { router, ...props } = this.props;
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
        <ButtonContainer>
          <ButtonSeparator />
          <TouchableText color={COLOR.grey} onPress={() => router.goBack()}>
            CANCEL
          </TouchableText>
          <TouchableText color={COLOR.blue} onPress={() => router.goBack()}>
            SAVE
          </TouchableText>
        </ButtonContainer>
      </Container>
    );
  }
}

export default AddAccount;
