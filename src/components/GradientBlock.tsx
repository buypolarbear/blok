import * as React from "react";
import styled from "styled-components/native";
import LinearGradient from "react-native-linear-gradient";
import { lightPurple, brightPurple, black } from "../style/color";

// --- types --- //
export interface Props {
  children: React.ReactChild | React.ReactChild[];
}

// --- styling --- //
const Card = styled(LinearGradient)`
  border-radius: 3px;
  shadow-opacity: 0.06;
  shadow-color: ${black};
  shadow-offset: 0px 8px;
  shadow-radius: 7px;
  elevation: 2;
  flex-direction: row;
`;

class GradientBlock extends React.Component<Props, {}> {
  // --- render --- //
  render() {
    const { children, ...props } = this.props;
    return (
      <Card
        colors={[lightPurple, brightPurple]}
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 1.0, y: 0.5 }}
        {...props}
      >
        {children}
      </Card>
    );
  }
}

export default GradientBlock;
