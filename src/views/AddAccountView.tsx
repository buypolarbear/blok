import * as React from "react";
import { Keyboard } from "react-native";
import styled from "styled-components/native";
import { inject } from "mobx-react/native";
import TouchableText from "../composites/TouchableText";
import Text from "../components/Text";
import Option from "../composites/Option";
import { COLOR, TICKER } from "../services/enums";
import Input from "../components/Input";
import { RouterStoreInterface } from "../store/_router";
import { AccountsStoreInterface } from "../store/_accounts";
import { width } from "../style/dimension";
import ButtonGradient from "../composites/ButtonGradient";

// --- types --- //
export interface Props {
  router?: RouterStoreInterface;
  accounts?: AccountsStoreInterface;
  refresh: boolean;
}

export interface State {
  selected: TICKER;
  name: string;
  publicAddress: string;
  step: number;
}

// --- styling --- //
const Container = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
`;

const TypeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const DetailsContainer = styled.View``;

const ButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  position: absolute;
  bottom: 0;
  padding-bottom: 50px;
  padding-left: 1px;
  padding-right: 1px;
`;

const Title = styled(Text)`
  margin-bottom: 20px;
`;

const OptionCard = styled(Option)`
  width: ${(width - 60) / 2}px;
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
    publicAddress: null,
    step: 1
  };

  // --- methods --- //
  componentWillReceiveProps(newProps) {
    if (newProps.refresh)
      this.setState({
        selected: null,
        name: null,
        publicAddress: null,
        step: 1
      });
  }

  renderOptions = (selected: TICKER, options: TICKER[]) =>
    options.map(option => (
      <OptionCard
        key={option}
        type={option}
        selected={selected === option}
        onPress={() => this.setState({ selected: option })}
      />
    ));

  onCancel = () => {
    Keyboard.dismiss();
    this.props.router.goBack();
  };

  onNext = () => this.setState({ step: 2 });

  onSave = () => {
    Keyboard.dismiss();
    this.props.accounts.addAccount(this.state.selected, this.state.name, this.state.publicAddress);
  };

  // --- render --- //
  render() {
    const { ...props } = this.props;
    const { selected, name, publicAddress, step } = this.state;
    return (
      <Container {...props}>
        <Title shadow>Type -- Details</Title>
        {step === 1 && (
          <TypeContainer>
            {this.renderOptions(selected, [
              TICKER.BTC,
              TICKER.ETH,
              TICKER.LTC,
              TICKER.XRP,
              TICKER.DASH,
              TICKER.STEEM
            ])}
          </TypeContainer>
        )}
        {step === 2 &&
          selected && (
            <DetailsContainer>
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
            </DetailsContainer>
          )}
        <ButtonContainer>
          <TouchableText color={COLOR.grey} onPress={this.onCancel}>
            CANCEL
          </TouchableText>
          <ButtonGradient text="NEXT" onPress={this.onNext} disabled={!selected} />
        </ButtonContainer>
      </Container>
    );
  }
}

export default AddAccountView;
