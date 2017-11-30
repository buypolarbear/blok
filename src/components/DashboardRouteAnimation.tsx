import * as React from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import { DIRECTION } from "../services/enums";
import {
  basePaddingTop,
  basePaddingBottom,
  basePaddingLeft,
  basePaddingRight
} from "../style/dimension";

// --- types --- //
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

// --- styling --- //
const Container = styled(Animated.View)`
  padding-top: ${basePaddingTop};
  padding-bottom: ${basePaddingBottom};
  padding-left: ${basePaddingLeft};
  padding-right: ${basePaddingRight};
  width: 100%;
`;

class DashboardRouteAnimation extends React.Component<Props, State> {
  // --- state --- //
  state = {
    previousView: null,
    pointerEvents: false,
    transitionDirection: DIRECTION.right,
    transition: new Animated.Value(0)
  };

  // --- methods --- //
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

  getOutDirection = (pathname, previousPathname) => {
    if (
      pathname === "/dashboard/settings" ||
      (pathname === "/dashboard/transactions" && previousPathname === "/dashboard/accounts")
    )
      return DIRECTION.left;
    return DIRECTION.right;
  };

  getInDirection = (pathname, previousPathname) => {
    if (
      pathname === "/dashboard/settings" ||
      (pathname === "/dashboard/transactions" && previousPathname === "/dashboard/accounts")
    )
      return DIRECTION.right;
    return DIRECTION.left;
  };

  runAnimation = (value, pathname, previousPathname) => {
    Animated.timing(this.state.transition, {
      duration: 200,
      toValue: value,
      useNativeDriver: true
    }).start(() => this.animationLogic(value, pathname, previousPathname));
  };

  animationLogic = (value, pathname, previousPathname) => {
    if (value === 0) {
      const direction = this.getInDirection(pathname, previousPathname);
      this.setState({ previousView: null, transitionDirection: direction }, () =>
        this.runAnimation(1, pathname, previousPathname)
      );
    } else {
      this.setState({ pointerEvents: true });
    }
  };

  // --- render --- //
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
