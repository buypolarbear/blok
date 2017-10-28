/* @flow */
import React, { Component } from "react";
import styled from "styled-components/native";
import { TouchableOpacity, Image } from "react-native";

// -- types ----------------------------------------------------------------- //
type Props = {
  onPress: Function,
  src: any,
  width: string,
  height: string
};

// -- styling --------------------------------------------------------------- //
const Icon = styled(Image)`
  width: ${props => props.width};
  height: ${props => props.height};
`;

class TouchableIcon extends Component<Props> {
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
