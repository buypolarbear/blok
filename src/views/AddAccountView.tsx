import * as React from "react";
import { Keyboard } from "react-native";
import styled from "styled-components/native";
import { inject } from "mobx-react/native";
import Text from "../components/Text";
import { TICKER } from "../services/enums";
import Input from "../components/Input";
import { RouterStoreInterface } from "../store/_router";
import { AccountsStoreInterface } from "../store/_accounts";
import ButtonGradient from "../composites/ButtonGradient";
import AddAccountType from "./AddAccountType";
import { isIphoneX } from "../services/utilities";

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

const DetailsContainer = styled.View``;

const ButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  position: absolute;
  bottom: 0;
  padding-bottom: ${isIphoneX() ? "40px" : "20px"};
  padding-left: ${isIphoneX() ? "20px" : "0px"};
  padding-right: ${isIphoneX() ? "20px" : "0px"};
`;

const Title = styled(Text)`
  margin-bottom: 20px;
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

  onCancel = () => {
    Keyboard.dismiss();
    this.props.router.goBack();
  };

  onNext = () => this.setState({ step: 2 });

  onSave = () => {
    Keyboard.dismiss();
    this.props.accounts.addAccount(this.state.selected, this.state.name, this.state.publicAddress);
  };

  onSelect = (option: TICKER) => this.setState({ selected: option });

  // --- render --- //
  render() {
    const { ...props } = this.props;
    const { selected, name, publicAddress, step } = this.state;
    return (
      <Container {...props}>
        <Title shadow>Type -- Details</Title>
        {step === 1 && <AddAccountType selected={selected} onSelect={this.onSelect} />}
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
          <ButtonGradient text="CANCEL" secondary onPress={this.onCancel} />
          {step === 1 ? (
            <ButtonGradient text="NEXT" onPress={this.onNext} disabled={!selected} />
          ) : (
            <ButtonGradient
              text="SAVE"
              onPress={this.onSave}
              disabled={!selected || !name || !publicAddress || step !== 2}
            />
          )}
        </ButtonContainer>
      </Container>
    );
  }
}

export default AddAccountView;
