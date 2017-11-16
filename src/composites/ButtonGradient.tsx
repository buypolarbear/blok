import * as React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Text from "../components/Text";
import { COLOR, SIZE } from "../services/enums";
import { darkBlue, blue, pink } from "../style/color";

// --- types --- //
export interface Props {
  onPress: () => void;
  text: string;
}

export interface State {}

// --- styling --- //
const Button = styled(LinearGradient)`
  width: 120px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 100;
  shadow-opacity: 0.15;
  shadow-color: ${pink};
  shadow-offset: 0px 7px;
  shadow-radius: 9px;
  elevation: 2;
`;

class ButtonGradient extends React.Component<Props, State> {
  // --- default props --- //
  static defaultProps: Partial<Props> = {};

  // --- state --- //
  state = {};

  // --- methods --- //

  // --- render --- //

  render() {
    const { text, onPress, ...props } = this.props;
    return (
      <TouchableOpacity onPress={onPress} {...props}>
        <Button start={{ x: 0.0, y: 0.5 }} end={{ x: 1, y: 0.5 }} colors={[darkBlue, blue, pink]}>
          <Text color={COLOR.darkPurple} size={SIZE.small}>
            {text.toUpperCase()}
          </Text>
        </Button>
      </TouchableOpacity>
    );
  }
}

export default ButtonGradient;
