import * as React from "react";
import styled from "styled-components/native";
import { darkPurple } from "../style/color";

// -- types ----------------------------------------------------------------- //
export interface Props {
  color: string;
  children: JSX.Element;
}

// -- styling --------------------------------------------------------------- //
const Container = styled.View`
  height: 100%;
  background-color: ${(p: Props) => p.color};
  flex-direction: row;
  flex-wrap: wrap;
`;

class Background extends React.Component<Props> {
  // -- default props ------------------------------------------------------- //
  static defaultProps: Partial<Props> = {
    color: darkPurple
  };

  // -- render -------------------------------------------------------------- //
  render() {
    const { children, color, ...props } = this.props;
    return (
      <Container color={color} {...props}>
        {children}
      </Container>
    );
  }
}

export default Background;
