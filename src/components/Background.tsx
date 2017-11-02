import * as React from "react";
import styled from "styled-components/native";
import { darkPurple } from "../style/color";

// -- types ----------------------------------------------------------------- //
interface Props {
  color?: string;
  children: any;
}

// -- styling --------------------------------------------------------------- //
const Container = styled.View`
  height: 100%;
  background-color: ${props => props.color};
  flex-direction: row;
  flex-wrap: wrap;
`;

class Background extends React.Component<Props> {
  // -- default props ------------------------------------------------------- //
  static defaultProps = {
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
