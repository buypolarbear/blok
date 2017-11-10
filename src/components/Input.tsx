import * as React from "react";
import { TextInputProperties } from "react-native";
import styled from "styled-components/native";
import { grey, darkPurple } from "../style/color";

// --- types --- //
export interface Props extends TextInputProperties {}

// --- styling --- //
const SInput = styled.TextInput`
  background-color: white;
  width: 100%;
  border-radius: 3px;
  shadow-opacity: 0.05;
  shadow-color: #000000;
  shadow-offset: 0px 8px;
  shadow-radius: 7px;
  elevation: 2;
  padding: 11.5px 15px;
  font-family: "Lato-Regular";
  font-size: 16px;
  color: ${darkPurple};
`;

class Input extends React.Component<Props, {}> {
  // --- render --- //
  render() {
    const { ...props } = this.props;
    return (
      <SInput
        autoCorrect={false}
        placeholderTextColor={grey}
        selectionColor={darkPurple}
        {...props}
      />
    );
  }
}

export default Input;
