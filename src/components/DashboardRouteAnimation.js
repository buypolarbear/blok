/* @flow */
import React, { Component } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import { isIphoneX } from "../services/utilities";

// -- types ----------------------------------------------------------------- //
type Props = {
  children: React$Node,
  location: Object
};

type State = {
  previousView: React$Node,
  transition: any
};

// -- styling --------------------------------------------------------------- //
const Container = styled.View`
  padding-top: ${isIphoneX() ? "65px" : "40px"};
  padding-bottom: ${isIphoneX() ? "94px" : "71px"};
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  opacity: ${props => props.transition};
`;
const AnimatedContainer = Animated.createAnimatedComponent(Container);

class DashboardRouteAnimation extends Component<Props, State> {
  // -- state --------------------------------------------------------------- //
  state = {
    previousView: null,
    transition: new Animated.Value(0)
  };

  // -- methods ------------------------------------------------------------- //
  componentWillReceiveProps(newProps: Object) {
    if (newProps.location.pathname !== this.props.location.pathname) {
      this.setState({ previousView: this.props.children });
    }
  }

  componentDidMount() {
    Animated.timing(this.state.transition, {
      duration: 1000,
      toValue: 1
    }).start();
  }

  // -- render -------------------------------------------------------------- //
  render() {
    const { children } = this.props;
    const { previousView, transition } = this.state;
    return (
      <AnimatedContainer
        transition={transition.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1]
        })}
      >
        {previousView || children}
      </AnimatedContainer>
    );
  }
}

export default DashboardRouteAnimation;
