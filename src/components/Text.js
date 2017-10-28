/* @flow */
import React, { Component } from "react";
import styled, { css } from "styled-components/native";
import { white, grey, green, blue, red } from "../style/color";

// -- types ----------------------------------------------------------------- //
type Props = {
  size?: "small" | "big" | "normal",
  color?: "white" | "grey" | "green" | "blue" | "red",
  children: string
};

// -- styling --------------------------------------------------------------- //
const smallText = css`
  font-size: 16px;
`;

const nomralText = css`
  font-size: 17px;
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

const StyledText = styled.Text`
  ${props => props.size === "small" && smallText};
  ${props => props.size === "normal" && nomralText};
  ${props => props.size === "big" && bigText};
  ${props => props.color === "white" && whiteText};
  ${props => props.color === "grey" && greyText};
  ${props => props.color === "blue" && blueText};
  ${props => props.color === "green" && greenText};
  ${props => props.color === "red" && redText};
  font-family: "Lato-Regular";
`;

class Text extends Component<Props> {
  // -- default props ------------------------------------------------------- //
  static defaultProps = {
    size: "normal",
    color: "white"
  };

  // -- render -------------------------------------------------------------- //
  render() {
    const { size, children, color } = this.props;
    return (
      <StyledText size={size} color={color}>
        {children}
      </StyledText>
    );
  }
}

export default Text;
