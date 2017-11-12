import * as React from "react";
import { Keyboard } from "react-native";
import styled from "styled-components/native";
import { inject } from "mobx-react/native";
import TouchableText from "../composites/TouchableText";
import Text from "../components/Text";
import ButtonOption from "../components/ButtonOption";
import { COLOR, TICKER } from "../services/enums";
import Separator from "../components/Separator";
import Input from "../components/Input";
import { tickerToString } from "../services/utilities";
import { RouterInterface } from "../store/_router";
import { AccountsInterface } from "../store/_accounts";

// --- types --- //
export interface Props {
  router?: RouterInterface;
  accounts?: AccountsInterface;
  refresh: boolean;
}

export interface State {
  selected: TICKER;
  name: string;
  publicAddress: string;
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
  margin-bottom: 35px;
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
  padding-bottom: 30px;
  padding-left: 1px;
  padding-right: 1px;
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
  margin-left: -1px;
  margin-right: -1px;
`;

const CameraInput = styled.View`
  position: relative;
  width: 100%;
  margin-top: 20px;
`;

@inject("router", "accounts")
class AddAccountView extends React.Component<Props, State> {
  // --- state --- //
  state = {
    selected: null,
    name: null,
    publicAddress: null
  };

  // --- methods --- //
  componentWillReceiveProps(newProps) {
    if (newProps.refresh)
      this.setState({
        selected: null,
        name: null,
        publicAddress: null
      });
  }

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

  onCancel = () => {
    Keyboard.dismiss();
    this.props.router.goBack();
  };

  onSave = () => {
    Keyboard.dismiss();
    this.props.accounts.saveAddress(this.state.selected, this.state.publicAddress, this.state.name);
  };

  // --- render --- //
  render() {
    const { router, ...props } = this.props;
    const { selected, name, publicAddress } = this.state;
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
        <Input
          placeholder="Name"
          maxLength={25}
          value={name}
          onChangeText={name =>
            this.setState({
              name
            })
          }
        />
        <CameraInput>
          <Input
            placeholder="Public Address"
            value={publicAddress}
            onChangeText={publicAddress =>
              this.setState({
                publicAddress: publicAddress.replace(/\s/g, "")
              })
            }
          />
        </CameraInput>
        <ButtonContainer>
          <ButtonSeparator />
          <TouchableText color={COLOR.grey} onPress={this.onCancel}>
            CANCEL
          </TouchableText>
          <TouchableText
            color={COLOR.blue}
            onPress={this.onSave}
            disabled={!name || !publicAddress || !selected}
          >
            SAVE
          </TouchableText>
        </ButtonContainer>
      </Container>
    );
  }
}

export default AddAccountView;
