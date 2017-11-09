import * as React from "react";
import { TouchableOpacity } from "react-native";
import Text from "../components/Text";
import { SIZE, COLOR } from "../services/enums";

// --- types --- //
export interface Props {
  onPress: () => any;
  children: string;
  color?: COLOR;
}

class TouchableText extends React.Component<Props, {}> {
  // --- render --- //
  render() {
    const { onPress, children, ...props } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <Text {...props} size={SIZE.small}>
          {children.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default TouchableText;
