import * as React from "react";
import styled, { css } from "styled-components/native";
import { white, grey, green, blue, red, darkPurple } from "../style/color";
import { SIZE, COLOR } from "../services/enums";

// --- types --- //
export interface Props {
  size?: SIZE;
  color?: COLOR;
  shadow?: boolean;
  children: string | string[] | React.ReactText | React.ReactText[];
}

// --- styling --- //
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

const darkPurpleText = css`
  color: ${darkPurple};
`;

const textShadow = css`
  shadow-opacity: 0.04;
  shadow-color: #000000;
  shadow-offset: 0px 1px;
  shadow-radius: 1px;
`;

const StyledText = styled.Text`
  ${(p: Props) => (p.size === SIZE.small ? smallText : "")};
  ${(p: Props) => (p.size === SIZE.normal ? nomralText : "")};
  ${(p: Props) => (p.size === SIZE.big ? bigText : "")};
  ${(p: Props) => (p.color === COLOR.white ? whiteText : "")};
  ${(p: Props) => (p.color === COLOR.grey ? greyText : "")};
  ${(p: Props) => (p.color === COLOR.blue ? blueText : "")};
  ${(p: Props) => (p.color === COLOR.green ? greenText : "")};
  ${(p: Props) => (p.color === COLOR.red ? redText : "")};
  ${(p: Props) => (p.color === COLOR.darkPurple ? darkPurpleText : "")};
  ${(p: Props) => (p.shadow ? textShadow : "")};
  font-family: "Lato-Regular";
  background-color: transparent;
`;

class Text extends React.Component<Props, {}> {
  // --- default props --- //
  static defaultProps: Partial<Props> = {
    size: SIZE.normal,
    color: COLOR.white,
    shadow: false
  };

  // --- render --- //
  render() {
    const { size, children, color, shadow, ...props } = this.props;
    return (
      <StyledText size={size} color={color} shadow={shadow} {...props}>
        {children}
      </StyledText>
    );
  }
}

export default Text;
