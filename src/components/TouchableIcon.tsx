import * as React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

// -- types ----------------------------------------------------------------- //
export interface Props {
  onPress: any;
  src: any;
  width: string;
  height: string;
}

// -- styling --------------------------------------------------------------- //
const Icon = styled.Image`
  width: ${(p: Props) => p.width};
  height: ${(p: Props) => p.height};
`;

class TouchableIcon extends React.Component<Props> {
  // -- default props ------------------------------------------------------- //
  static defaultProps: Partial<Props> = {
    src: null,
    width: "20px",
    height: "20px"
  };

  // -- render -------------------------------------------------------------- //
  render() {
    const { onPress, src, width, height, ...props } = this.props;
    return (
      <TouchableOpacity onPress={onPress} {...props}>
        <Icon source={src} width={width} height={height} />
      </TouchableOpacity>
    );
  }
}

export default TouchableIcon;
