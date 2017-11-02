import * as React from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import { isIphoneX } from "../services/utilities";
import { DIRECTION } from "../services/enums";

// -- types ----------------------------------------------------------------- //
export interface Props {
  children: React.ReactChild;
  pathname: string;
}

export interface State {
  previousView: React.ReactChild | null;
  transition: Object;
  pointerEvents: boolean;
  transitionDirection: DIRECTION;
}

// -- styling --------------------------------------------------------------- //
const Container = styled(Animated.View)`
  padding-top: ${isIphoneX() ? "65px" : "40px"};
  padding-bottom: ${isIphoneX() ? "94px" : "71px"};
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
`;

class DashboardRouteAnimation extends React.Component<Props, State> {
  // -- state --------------------------------------------------------------- //
  state = {
    previousView: null,
    pointerEvents: false,
    transitionDirection: DIRECTION.right,
    transition: new Animated.Value(0)
  };

  // -- methods ------------------------------------------------------------- //
  componentWillReceiveProps(newProps: Props) {
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
    if (pathname === "/settings" || (pathname === "/transactions" && previousPathname === "/"))
      return DIRECTION.left;
    else return DIRECTION.right;
  };

  getInDirection = (pathname: string, previousPathname: string) => {
    if (pathname === "/settings" || (pathname === "/transactions" && previousPathname === "/"))
      return DIRECTION.right;
    else return DIRECTION.left;
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
                outputRange: [transitionDirection === DIRECTION.right ? 10 : -10, 0]
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
