import * as React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import Text from "./Text";
import { white, blue } from "../style/color";
import { COLOR, SIZE } from "../services/enums";

// --- types --- //
export interface Props {
  children: string;
  selected?: boolean;
  onPress: () => any;
}

export interface State {}

// --- styling --- //
const Container: any = styled.View`
  background-color: ${(p: Props) => (p.selected ? blue : white)};
  padding-top: 10px;
  padding-bottom: 11px;
  align-items: center;
  border-radius: 3px;
  shadow-opacity: 0.05;
  shadow-color: #000000;
  shadow-offset: 0px 8px;
  shadow-radius: 7px;
  elevation: 2;
`;

class ButtonOption extends React.Component<Props, State> {
  // --- default props --- //
  static defaultProps: Partial<Props> = {
    selected: false
  };

  // --- state --- //
  state = {};

  // --- methods --- //

  // --- render --- //

  render() {
    const { children, selected, onPress, ...props } = this.props;
    return (
      <TouchableOpacity onPress={onPress} {...props}>
        <Container selected={selected}>
          <Text color={selected ? COLOR.white : COLOR.darkPurple} size={SIZE.normal}>
            {children}
          </Text>
        </Container>
      </TouchableOpacity>
    );
  }
}

export default ButtonOption;
