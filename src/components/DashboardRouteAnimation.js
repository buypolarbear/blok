/* @flow */
import React, { Component } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import { isIphoneX } from "../services/utilities";

// -- types ----------------------------------------------------------------- //
type Props = {
  children: React$Node,
  pathname: string
};

type State = {
  previousView: React$Node,
  transition: Object,
  pointerEvents: boolean,
  transitionDirection: "LEFT" | "RIGHT"
};

// -- styling --------------------------------------------------------------- //
const Container = styled(Animated.View)`
  padding-top: ${isIphoneX() ? "65px" : "40px"};
  padding-bottom: ${isIphoneX() ? "94px" : "71px"};
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
`;

class DashboardRouteAnimation extends Component<Props, State> {
  // -- state --------------------------------------------------------------- //
  state = {
    previousView: null,
    pointerEvents: false,
    transitionDirection: "RIGHT",
    transition: new Animated.Value(0)
  };

  // -- methods ------------------------------------------------------------- //
  componentWillReceiveProps(newProps: Object) {
    const pathname = newProps.pathname;
    const previousPathname = this.props.pathname;
    if (pathname !== previousPathname) {
      const direction = this.getOutDirection(pathname, previousPathname);
      this.setState({ previousView: this.props.children, transitionDirection: direction }, () =>
        this.runAnimation(0, pathname, previousPathname)
      );
    }
  }

  componentDidMount() {
    this.runAnimation(1, this.props.pathname, this.props.pathname);
  }

  getOutDirection = (pathname: string, previousPathname: string) => {
    if (pathname === "/") return "RIGHT";
    if (pathname === "/settings") return "LEFT";
    if (pathname === "/transactions" && previousPathname === "/") return "LEFT";
    if (pathname === "/transactions" && previousPathname === "/settings") return "RIGHT";
  };

  getInDirection = (pathname: string, previousPathname: string) => {
    if (pathname === "/") return "LEFT";
    if (pathname === "/settings") return "RIGHT";
    if (pathname === "/transactions" && previousPathname === "/") return "RIGHT";
    if (pathname === "/transactions" && previousPathname === "/settings") return "LEFT";
  };

  runAnimation = (value: number, pathname: string, previousPathname: string) => {
    Animated.timing(this.state.transition, {
      duration: 150,
      toValue: value,
      useNativeDriver: true
    }).start(() => this.animationLogic(value, pathname, previousPathname));
  };

  animationLogic = (value: number, pathname: string, previousPathname: string) => {
    if (value === 0) {
      const direction = this.getInDirection(pathname, previousPathname);
      this.setState({ previousView: null, transitionDirection: direction }, () =>
        this.runAnimation(1, pathname, previousPathname)
      );
    } else {
      this.setState({ pointerEvents: true });
    }
  };

  // -- render -------------------------------------------------------------- //
  render() {
    const { children } = this.props;
    const { previousView, transition, pointerEvents, transitionDirection } = this.state;

    return (
      <Container
        pointerEvents={pointerEvents ? "auto" : "none"}
        style={{
          opacity: transition,
          transform: [
            {
              translateX: transition.interpolate({
                inputRange: [0, 1],
                outputRange: [transitionDirection === "RIGHT" ? 10 : -10, 0]
              })
            }
          ]
        }}
      >
        {previousView || children}
      </Container>
    );
  }
}

export default DashboardRouteAnimation;
