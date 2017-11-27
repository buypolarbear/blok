import * as React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import Text from "../components/Text";
import { COLOR, SIZE } from "../services/enums";
import { black, white } from "../style/color";

// --- types --- //
export interface Props {
  onPress: () => void;
  text: string;
}

// --- styling --- //
const Button: any = styled.View`
  width: 110px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.3);
  justify-content: center;
  align-items: center;
  border-radius: 100;
  shadow-opacity: 0.17;
  shadow-color: ${black};
  shadow-offset: 0px 6px;
  shadow-radius: 8px;
  elevation: 2;
  border-width: 1px;
  border-color: ${white};
`;

class ButtonOpaque extends React.Component<Props, {}> {
  // --- render --- //
  render() {
    const { text, onPress, ...props } = this.props;
    return (
      <TouchableOpacity onPress={onPress} {...props}>
        <Button>
          <Text color={COLOR.white} size={SIZE.small}>
            {text.toUpperCase()}
          </Text>
        </Button>
      </TouchableOpacity>
    );
  }
}

export default ButtonOpaque;
