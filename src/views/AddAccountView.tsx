import * as React from "react";
import * as ReactNative from "react-native";
import styled from "styled-components/native";
import { inject, observer } from "mobx-react/native";
import Text from "../components/Text";
import { TICKER, COLOR } from "../services/enums";
import ButtonGradient from "../composites/ButtonGradient";
import AddAccountType from "./AddAccountType";
import AddAccountDetails from "./AddAccountDetails";
import { isIphoneX } from "../services/utilities";
import { easeInQuad, easeOutQuad } from "../style/easing";
import { white } from "../style/color";
import { Router, Accounts } from "../services/interfaces";

const { Keyboard, Animated } = ReactNative;

// --- types --- //
export interface Props {
  router?: Router.RouterStore;
  accounts?: Accounts.AccountsStore;
  refresh: boolean;
}

export interface State {
  selected: TICKER | null;
  name: string;
  address: string;
  step: number;
  buttonTransition: ReactNative.Animated.Value;
  stepTransition: ReactNative.Animated.Value;
  titleTransition: ReactNative.Animated.Value;
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

const Loader = styled.ActivityIndicator`
  position: absolute;
  bottom: 0;
  padding-bottom: ${isIphoneX() ? "40px" : "20px"};
  align-self: center;
`;

const Title = styled(Text)`
  margin-left: 20px;
  margin-right: 20px;
`;

const Steps = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: -20px;
`;

const StepsSeparator = styled.View`
  height: 1px;
  width: 30px;
  background-color: ${white};
`;

const StepsAnimatin = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
`;

@inject("router", "accounts")
@observer
class AddAccountView extends React.Component<Props, State> {
  // --- state --- //
  state = {
    selected: null,
    name: "",
    address: "",
    step: 1,
    buttonTransition: new Animated.Value(1),
    stepTransition: new Animated.Value(1),
    titleTransition: new Animated.Value(1),
    animating: false
  };

  // --- methods --- //
  componentWillReceiveProps(newProps: Props) {
    if (newProps.refresh)
      this.setState({
        selected: null,
        name: "",
        address: "",
        step: 1,
        animating: false,
        buttonTransition: new Animated.Value(1),
        stepTransition: new Animated.Value(1),
        titleTransition: new Animated.Value(1)
      });
  }

  onCancel = () => {
    Keyboard.dismiss();
    this.props.router!.goBack();
  };

  onNext = () => {
    this.setState({ animating: true });
    this.animateStep(0);
    this.animateButtons(0);
    this.animateTitles();
  };

  onSave = () => {
    Keyboard.dismiss();
    this.props.accounts!.addAccount(this.state.selected, this.state.name, this.state.address);
  };

  onSelect = (option: TICKER) => this.setState({ selected: option });

  onNameChange = (name: string) => this.setState({ name });

  onAddressChange = (address: string) => this.setState({ address });

  onAddressPaste = (address: string) => this.setState({ address });

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

  animateTitles = () => {
    Animated.timing(this.state.titleTransition, {
      toValue: 0,
      duration: 230,
      delay: 290,
      useNativeDriver: true
    }).start();
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
      titleTransition,
      animating
    } = this.state;
    return (
      <Container {...props} pointerEvents={animating ? "none" : "auto"}>
        <Steps>
          <StepsAnimatin
            style={{
              opacity: titleTransition.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1]
              })
            }}
          >
            <Title shadow color={COLOR.white}>
              Type
            </Title>
            <StepsSeparator />
          </StepsAnimatin>
          <StepsAnimatin
            style={{
              opacity: titleTransition.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.5]
              })
            }}
          >
            <StepsSeparator />
            <Title shadow color={COLOR.white}>
              Details
            </Title>
          </StepsAnimatin>
        </Steps>
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
                onAddressPaste={this.onAddressPaste}
              />
            )}
        </Animated.View>
        {this.props.accounts!.fetching ? (
          <Loader size="large" />
        ) : (
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
        )}
      </Container>
    );
  }
}

export default AddAccountView;
