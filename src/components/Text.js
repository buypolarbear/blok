/* @flow */
import React, { Component } from "react";
import styled, { css } from "styled-components/native";
import { white, grey, green, blue, red } from "../style/color";

// -- types ----------------------------------------------------------------- //
type Props = {
  size?: "small" | "big" | "normal",
  color?: "white" | "grey" | "green" | "blue" | "red",
  shadow?: boolean,
  children: string
};

// -- styling --------------------------------------------------------------- //
const smallText = css`
  font-size: 15px;
`;

const nomralText = css`
  font-size: 16px;
`;

const bigText = css`
  font-size: 28px;
`;

const whiteText = css`
  color: ${white};
`;

const greyText = css`
  color: ${grey};
`;

const blueText = css`
  color: ${blue};
`;

const greenText = css`
  color: ${green};
`;

const redText = css`
  color: ${red};
`;

const textShadow = css`
  shadow-opacity: 0.04;
  shadow-color: #000000;
  shadow-offset: 0px 1px;
  shadow-radius: 1px;
`;

const StyledText = styled.Text`
  ${props => props.size === "small" && smallText};
  ${props => props.size === "normal" && nomralText};
  ${props => props.size === "big" && bigText};
  ${props => props.color === "white" && whiteText};
  ${props => props.color === "grey" && greyText};
  ${props => props.color === "blue" && blueText};
  ${props => props.color === "green" && greenText};
  ${props => props.color === "red" && redText};
  ${props => props.shadow && textShadow};
  font-family: "Lato-Regular";
  background-color: transparent;
`;

class Text extends Component<Props> {
  // -- default props ------------------------------------------------------- //
  static defaultProps = {
    size: "normal",
    color: "white",
    shadow: false
  };

  // -- render -------------------------------------------------------------- //
  render() {
    const { size, children, color, shadow } = this.props;
    return (
      <StyledText size={size} color={color} shadow={shadow}>
        {children}
      </StyledText>
    );
  }
}

export default Text;
