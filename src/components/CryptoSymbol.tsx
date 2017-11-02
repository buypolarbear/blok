import * as React from "react";
import styled from "styled-components/native";

// -- types ----------------------------------------------------------------- //
interface Props {
  src: any;
}

// -- styling --------------------------------------------------------------- //
const Container = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  shadow-opacity: 0.05;
  shadow-color: #000000;
  shadow-offset: 0px 3px;
  shadow-radius: 5px;
  elevation: 2;
`;

const Icon = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

class CryptoSymbol extends React.Component<Props> {
  // -- methods ------------------------------------------------------------- //

  // -- render -------------------------------------------------------------- //
  render() {
    const { src, ...props } = this.props;
    return (
      <Container>
        <Icon source={src} {...props} />
      </Container>
    );
  }
}

export default CryptoSymbol;
