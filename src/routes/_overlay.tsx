import * as React from "react";
import { Route, Switch } from "react-router-native";
import { Animated } from "react-native";
import styled from "styled-components/native";
import Background from "../components/Background";
import AddAccountView from "../views/AddAccountView";
import { black } from "../style/color";
import { height, basePaddingTop, basePaddingLeft, basePaddingRight } from "../style/dimension";
import { easeInOutCubic } from "../style/easing";
import KeyboardAvoidingView from "../components/KeyboardAvoidingView";
import { Router } from "../services/interfaces";

// --- types --- //
interface Props {
  location: Router.Location;
}

interface State {
  animation: Animated.Value;
  pointerEvents: boolean;
  previousLocation: Router.Location;
}

// ---styling --- //
const Container: any = styled(KeyboardAvoidingView)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
`;

const BackDrop = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${black};
`;

const SBackground = styled(Background)`
  padding-top: ${basePaddingTop};
  padding-left: ${basePaddingLeft};
  padding-right: ${basePaddingRight};
`;

const AnimatedBackground = Animated.createAnimatedComponent(SBackground);

class Overlay extends React.Component<Props, State> {
  // --- state --- //
  state = {
    animation: new Animated.Value(0),
    pointerEvents: false,
    previousLocation: this.props.location
  };

  // --- methods --- //
  componentWillReceiveProps(newProps) {
    const location = newProps.location;
    if (location.state && location.state.overlay) this.setState({ previousLocation: location });
    this.isOverlay(location) ? this.onAnimateOverlay(1) : this.onAnimateOverlay(0);
  }

  componentDidMount() {
    this.isOverlay(this.props.location) && this.onAnimateOverlay(1);
  }

  onAnimateOverlay = value => {
    Animated.timing(this.state.animation, {
      toValue: value,
      duration: 500,
      easing: easeInOutCubic,
      useNativeDriver: true
    }).start(() => this.setState({ pointerEvents: value === 1 }));
  };

  isOverlay = location => location.state && location.state.overlay;

  // --- render --- //
  render() {
    const { location, ...props } = this.props;
    const { animation, previousLocation } = this.state;
    const l = location.state && location.state.overlay ? location : previousLocation;
    const refresh = l === location;
    return (
      <Container pointerEvents={this.state.pointerEvents ? "auto" : "none"} {...props}>
        <BackDrop
          style={{
            opacity: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.4]
            })
          }}
        />
        <AnimatedBackground
          style={{
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [height, 0]
                })
              }
            ]
          }}
        >
          <Switch location={l}>
            <Route
              path="/overlay/add-account"
              render={() => <AddAccountView refresh={refresh} />}
            />
          </Switch>
        </AnimatedBackground>
      </Container>
    );
  }
}

export default Overlay;
