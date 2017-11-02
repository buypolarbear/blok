import * as React from "react";
import styled from "styled-components/native";
import LinearGradient from "react-native-linear-gradient";
import { purple, lightPurple } from "../style/color";

// -- types ----------------------------------------------------------------- //
export interface Props {
  children: JSX.Element[];
}

// -- styling --------------------------------------------------------------- //
const Card = styled(LinearGradient)`
  width: 100%;
  height: 60px;
  border-radius: 4px;
  shadow-opacity: 0.05;
  shadow-color: #000000;
  shadow-offset: 0px 8px;
  shadow-radius: 7px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  elevation: 2;
  flex-direction: row;
`;

class GradientBlock extends React.Component<Props> {
  // -- render -------------------------------------------------------------- //
  render() {
    const { children } = this.props;
    return (
      <Card colors={[lightPurple, purple]} start={{ x: 0.0, y: 0.5 }} end={{ x: 1.0, y: 0.5 }}>
        {children}
      </Card>
    );
  }
}

export default GradientBlock;
