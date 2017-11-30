import * as React from "react";
import styled, { css } from "styled-components/native";
import { white, grey, green, red, darkPurple, lightGrey, darkGrey } from "../style/color";
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

const greenText = css`
  color: ${green};
`;

const redText = css`
  color: ${red};
`;

const darkPurpleText = css`
  color: ${darkPurple};
`;

const lightGreyText = css`
  color: ${lightGrey};
`;

const darkGreyText = css`
  color: ${darkGrey};
`;

const textShadow = css`
  shadow-opacity: 0.04;
  shadow-color: #000000;
  shadow-offset: 0px 1px;
  shadow-radius: 1px;
`;

const StyledText = styled.Text`
  ${(p: Props) => (p.size === SIZE.small ? smallText : "")};
  ${p => (p.size === SIZE.normal ? nomralText : "")};
  ${p => (p.size === SIZE.big ? bigText : "")};
  ${p => (p.color === COLOR.white ? whiteText : "")};
  ${p => (p.color === COLOR.grey ? greyText : "")};
  ${p => (p.color === COLOR.green ? greenText : "")};
  ${p => (p.color === COLOR.red ? redText : "")};
  ${p => (p.color === COLOR.darkPurple ? darkPurpleText : "")};
  ${p => (p.color === COLOR.lightGrey ? lightGreyText : "")};
  ${p => (p.color === COLOR.darkGrey ? darkGreyText : "")};
  ${p => (p.shadow ? textShadow : "")};
  font-family: "Lato-Regular";
  background-color: transparent;
`;

class Text extends React.Component<Props, {}> {
  // --- default props --- //
  static defaultProps: Partial<Props> = {
    size: SIZE.normal,
    color: COLOR.lightGrey,
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
