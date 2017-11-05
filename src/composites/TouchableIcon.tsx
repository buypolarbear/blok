import * as React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "../components/Icon";

// -- types ----------------------------------------------------------------- //
export interface Props {
  onPress: () => void;
  src: any;
  width: string;
  height: string;
}

class TouchableIcon extends React.Component<Props, {}> {
  // -- render -------------------------------------------------------------- //
  render() {
    const { onPress, src, width, height } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <Icon source={src} width={width} height={height} />
      </TouchableOpacity>
    );
  }
}

export default TouchableIcon;
