import * as React from "react";
import { TouchableOpacity } from "react-native";
import Text from "../components/Text";
import { SIZE, COLOR } from "../services/enums";

// --- types --- //
export interface Props {
  onPress: () => any;
  children: string;
  color?: COLOR;
  disabled?: boolean;
}

class TouchableText extends React.Component<Props, {}> {
  // --- render --- //
  render() {
    const { onPress, children, disabled, ...props } = this.props;
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <Text {...props} size={SIZE.small}>
          {children.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default TouchableText;
