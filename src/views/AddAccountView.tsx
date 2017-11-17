import * as React from "react";
import { Keyboard } from "react-native";
import styled from "styled-components/native";
import { inject } from "mobx-react/native";
import Text from "../components/Text";
import { TICKER } from "../services/enums";
import { RouterStoreInterface } from "../store/_router";
import { AccountsStoreInterface } from "../store/_accounts";
import ButtonGradient from "../composites/ButtonGradient";
import AddAccountType from "./AddAccountType";
import AddAccountDetails from "./AddAccountDetails";
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
  address: string;
  step: number;
}

// --- styling --- //
const Container = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
`;

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

@inject("router", "accounts")
class AddAccountView extends React.Component<Props, State> {
  // --- state --- //
  state = {
    selected: null,
    name: null,
    address: null,
    step: 1
  };

  // --- methods --- //
  componentWillReceiveProps(newProps) {
    if (newProps.refresh)
      this.setState({
        selected: null,
        name: null,
        address: null,
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
    this.props.accounts.addAccount(this.state.selected, this.state.name, this.state.address);
  };

  onSelect = (option: TICKER) => this.setState({ selected: option });

  onNameChange = (name: string) => this.setState({ name });

  onAddressChange = (address: string) => this.setState({ address });

  // --- render --- //
  render() {
    const { ...props } = this.props;
    const { selected, name, address, step } = this.state;
    return (
      <Container {...props}>
        <Title shadow>Type -- Details</Title>
        {step === 1 && <AddAccountType selected={selected} onSelect={this.onSelect} />}
        {step === 2 &&
          selected && (
            <AddAccountDetails
              address={address}
              name={name}
              onAddressChange={this.onAddressChange}
              onNameChange={this.onNameChange}
            />
          )}
        <ButtonContainer>
          <ButtonGradient text="CANCEL" secondary onPress={this.onCancel} />
          {step === 1 ? (
            <ButtonGradient text="NEXT" onPress={this.onNext} disabled={!selected} />
          ) : (
            <ButtonGradient
              text="SAVE"
              onPress={this.onSave}
              disabled={!selected || !name || !address || step !== 2}
            />
          )}
        </ButtonContainer>
      </Container>
    );
  }
}

export default AddAccountView;
