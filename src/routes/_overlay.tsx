import * as React from "react";
import styled from "styled-components/native";

// -- types ----------------------------------------------------------------- //

// -- styling --------------------------------------------------------------- //
const Container = styled.View`
  background: red;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
`;

class Overlay extends React.Component<{}, {}> {
  // -- default props ------------------------------------------------------- //
  static defaultProps = {};

  // -- state --------------------------------------------------------------- //
  state = {};

  // -- methods ------------------------------------------------------------- //

  // -- render -------------------------------------------------------------- //
  render() {
    const { ...props } = this.props;
    return <Container {...props} />;
  }
}

export default Overlay;
