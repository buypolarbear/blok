import * as React from "react";
import styled from "styled-components/native";
import { inject } from "mobx-react/native";
import TouchableText from "../composites/TouchableText";
import Text from "../components/Text";
import ButtonOption from "../components/ButtonOption";
import { COLOR, TICKER } from "../services/enums";
import Separator from "../components/Separator";
import Input from "../components/Input";
import { isIphoneX, tickerToString } from "../services/utilities";
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

const CameraInput = styled.View`
  position: relative;
  width: 100%;
  margin-top: 20px;
`;

@inject("router")
class AddAccountView extends React.Component<Props, State> {
  // --- state --- //
  state = {
    selected: null
  };

  // --- methods --- //
  renderOptions = (selected: TICKER, options: TICKER[]) =>
    options.map(option => (
      <Option
        key={option}
        selected={selected === option}
        onPress={() => this.setState({ selected: option })}
      >
        {tickerToString(option)}
      </Option>
    ));

  // --- render --- //
  render() {
    const { router, ...props } = this.props;
    const { selected } = this.state;
    return (
      <Container {...props}>
        <Title shadow>Account Type</Title>
        <OptionContainer>
          {this.renderOptions(selected, [
            TICKER.BTC,
            TICKER.ETH,
            TICKER.LTC,
            TICKER.XRP,
            TICKER.DASH,
            TICKER.STEEM
          ])}
        </OptionContainer>
        <Title shadow>Account Details</Title>
        <Input placeholder="Name" />
        <CameraInput>
          <Input placeholder="Public Address" />
        </CameraInput>
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

export default AddAccountView;
