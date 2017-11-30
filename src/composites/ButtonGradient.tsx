import * as React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Text from "../components/Text";
import { COLOR, SIZE } from "../services/enums";
import { darkBlue, blue, pink, grey, lightGrey, brightPurple } from "../style/color";

// --- types --- //
export interface Props {
  onPress: () => void;
  text: string;
  disabled?: boolean;
  secondary?: boolean;
}

// --- styling --- //
const Button: any = styled(LinearGradient)`
  width: 110px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 100;
  shadow-opacity: ${(p: Props) => (p.secondary || p.disabled ? 0.07 : 0.17)};
  shadow-color: ${p => (p.secondary ? darkBlue : pink)};
  shadow-offset: 0px 6px;
  shadow-radius: 8px;
  elevation: 2;
`;

class ButtonGradient extends React.Component<Props, {}> {
  // --- render --- //
  render() {
    const { text, onPress, disabled, secondary, ...props } = this.props;
    let gradient = [];
    if (disabled) gradient = [grey, lightGrey];
    else if (secondary) gradient = [brightPurple, darkBlue];
    else gradient = [darkBlue, blue, pink];
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled} {...props}>
        <Button
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          colors={gradient}
          disabled={disabled}
          secondary={secondary}
        >
          <Text color={disabled ? COLOR.darkGrey : COLOR.darkPurple} size={SIZE.small}>
            {text.toUpperCase()}
          </Text>
        </Button>
      </TouchableOpacity>
    );
  }
}

export default ButtonGradient;
