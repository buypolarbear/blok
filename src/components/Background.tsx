import * as React from "react";
import styled from "styled-components/native";
import LinearGradient from "react-native-linear-gradient";
import { darkPurple, purple } from "../style/color";

// --- types --- //
export interface Props {
  children: React.ReactChild | React.ReactChild[];
}

// --- styling --- //
const Container = styled(LinearGradient)`
  height: 100%;
  width: 100%;
  background-color: transparent;
  flex-direction: row;
  flex-wrap: wrap;
`;

class Background extends React.Component<Props, {}> {
  // --- render --- //
  render() {
    const { children, ...props } = this.props;
    return (
      <Container
        colors={[purple, purple, darkPurple]}
        locations={[0, 0.35, 1]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1, y: 1.0 }}
        {...props}
      >
        {children}
      </Container>
    );
  }
}

export default Background;
