import * as React from "react";
import * as ReactNative from "react-native";
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
import { easeInQuad, easeOutQuad } from "../style/easing";

const { Keyboard, Animated } = ReactNative;

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
  buttonTransition: ReactNative.Animated.Value;
  stepTransition: ReactNative.Animated.Value;
  animating: boolean;
}

// --- styling --- //
const Container = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ButtonContainer = styled(Animated.View)`
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
    step: 1,
    buttonTransition: new Animated.Value(1),
    stepTransition: new Animated.Value(1),
    animating: false
  };

  // --- methods --- //
  componentWillReceiveProps(newProps) {
    if (newProps.refresh)
      this.setState({
        selected: null,
        name: null,
        address: null,
        step: 1,
        animating: false
      });
  }

  onCancel = () => {
    Keyboard.dismiss();
    this.props.router.goBack();
  };

  onNext = () => {
    this.setState({ animating: true });
    this.animateStep(0);
    this.animateButtons(0);
  };

  onSave = () => {
    Keyboard.dismiss();
    this.props.accounts.addAccount(this.state.selected, this.state.name, this.state.address);
  };

  onSelect = (option: TICKER) => this.setState({ selected: option });

  onNameChange = (name: string) => this.setState({ name });

  onAddressChange = (address: string) => this.setState({ address });

  animateStep = (value: number) => {
    Animated.timing(this.state.stepTransition, {
      toValue: value,
      duration: 230,
      delay: value === 0 ? 0 : 60,
      easing: value === 0 ? easeInQuad : easeOutQuad
    }).start(() => {
      if (value === 0) this.animateStep(1);
    });
  };

  animateButtons = (value: number) => {
    value === 1 && this.setState({ step: 2 });
    Animated.timing(this.state.buttonTransition, {
      toValue: value,
      duration: 260,
      delay: 30,
      easing: value === 0 ? easeInQuad : easeOutQuad
    }).start(() => {
      if (value === 0) this.animateButtons(1);
      else this.setState({ animating: false });
    });
  };

  // --- render --- //
  render() {
    const { ...props } = this.props;
    const {
      selected,
      name,
      address,
      step,
      buttonTransition,
      stepTransition,
      animating
    } = this.state;
    return (
      <Container {...props} pointerEvents={animating ? "none" : "auto"}>
        <Title shadow>Type -- Details</Title>
        <Animated.View
          style={{
            opacity: stepTransition,
            transform: [
              {
                translateX: stepTransition.interpolate({
                  inputRange: [0, 1],
                  outputRange: [step === 1 ? -100 : 100, 0]
                })
              }
            ]
          }}
        >
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
        </Animated.View>
        <ButtonContainer
          style={{
            opacity: buttonTransition,
            transform: [
              {
                translateX: buttonTransition.interpolate({
                  inputRange: [0, 1],
                  outputRange: [step === 1 ? -100 : 100, 0]
                })
              }
            ]
          }}
        >
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
