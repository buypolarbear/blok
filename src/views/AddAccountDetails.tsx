import * as React from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import Input from "../components/Input";

// --- types --- //
export interface Props {
  name: string;
  address: string;
  onNameChange: (name: string) => void;
  onAddressChange: (address: string) => void;
}

export interface State {}

// --- styling --- //
const CameraInput = styled.View`
  position: relative;
  width: 100%;
  margin-top: 20px;
`;

class AddAccountDetails extends React.Component<Props, State> {
  // --- default props --- //
  static defaultProps: Partial<Props> = {};

  // --- state --- //
  state = {};

  // --- methods --- //

  // --- render --- //

  render() {
    const { name, address, onNameChange, onAddressChange, ...props } = this.props;
    return (
      <View {...props}>
        <Input
          placeholder="Name"
          maxLength={25}
          value={name}
          onChangeText={name => onNameChange(name)}
        />
        <CameraInput>
          <Input
            placeholder="Public Address"
            value={address}
            onChangeText={address => onAddressChange(address.replace(/\s/g, ""))}
          />
        </CameraInput>
      </View>
    );
  }
}

export default AddAccountDetails;
