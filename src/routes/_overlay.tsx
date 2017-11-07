import * as React from "react";
import { Animated, Text } from "react-native";
import styled from "styled-components/native";
import { LocationInterface } from "../store/_router";
import Background from "../components/Background";
import { black } from "../style/color";
import { height } from "../style/dimension";

// -- types ----------------------------------------------------------------- //
interface Props {
  location: LocationInterface;
}

interface State {
  animation: Animated.Value;
  pointerEvents: boolean;
}

// -- styling --------------------------------------------------------------- //
const Container = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
`;

const BackDrop = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${black};
  opacity: 0.4;
`;

const AnimatedBackground = Animated.createAnimatedComponent(Background);

class Overlay extends React.Component<Props, State> {
  // -- state --------------------------------------------------------------- //
  state = {
    animation: new Animated.Value(0),
    pointerEvents: false
  };

  // -- methods ------------------------------------------------------------- //
  componentWillReceiveProps(newProps: Props) {
    const location = newProps.location;
    this.isOverlay(location) ? this.onAnimateOverlay(1) : this.onAnimateOverlay(0);
  }

  componentDidMount() {
    this.isOverlay(this.props.location) && this.onAnimateOverlay(1);
  }

  onAnimateOverlay = (value: number) => {
    Animated.timing(this.state.animation, {
      toValue: value,
      duration: 400,
      useNativeDriver: true
    }).start(() => this.setState({ pointerEvents: value === 1 }));
  };

  isOverlay = (location: LocationInterface) => location.state && location.state.overlay;

  // -- render -------------------------------------------------------------- //
  render() {
    const { location, ...props } = this.props;
    const { animation } = this.state;
    return (
      <Container
        style={{ opacity: animation }}
        pointerEvents={this.state.pointerEvents ? "auto" : "none"}
        {...props}
      >
        <BackDrop />
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
          <Text>test</Text>
        </AnimatedBackground>
      </Container>
    );
  }
}

export default Overlay;
