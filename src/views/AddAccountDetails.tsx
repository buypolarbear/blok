import * as React from "react";
import { inject, observer } from "mobx-react/native";
import { reaction } from "mobx";
import { Clipboard, Keyboard } from "react-native";
import styled from "styled-components/native";
import Input from "../components/Input";
import TouchableIcon from "../composites/TouchableIcon";
import { CameraStoreInterface } from "../store/_camera";

// --- types --- //
export interface Props {
  name: string;
  address: string;
  onNameChange: (name: string) => void;
  onAddressChange: (address: string) => void;
  onAddressPaste: (address: string) => void;
  camera?: CameraStoreInterface;
}

// --- styling --- //
const ClipboardInput = styled.View`
  position: relative;
  width: 100%;
  margin-top: 20px;
`;

const DetailsContainer = styled.View`
  margin-top: 20px;
`;

const PasteIcon = styled(TouchableIcon)`
  position: absolute;
  right: 15px;
  top: 11px;
  z-index: 2;
`;

const AddressInput = styled(Input)`
  padding-right: 55px;
`;

@inject("camera")
@observer
class AddAccountDetails extends React.Component<Props, {}> {
  barcodeListener;

  // --- methods --- //
  componentDidMount() {
    this.props.camera.reset();
    this.barcodeListener = reaction(
      () => this.props.camera.barcode,
      () => this.props.onAddressPaste(this.props.camera.barcode)
    );
  }

  componentWillUnmount() {
    this.barcodeListener();
  }

  onAddressPaste = async () => {
    const data = await Clipboard.getString();
    this.props.onAddressPaste(data);
  };

  onShowCamera = () => {
    Keyboard.dismiss();
    this.props.camera.toggleCamera(true);
  };

  // --- render --- //
  render() {
    const { name, address, onNameChange, onAddressChange, ...props } = this.props;
    return (
      <DetailsContainer {...props}>
        <Input
          placeholder="Account Name"
          maxLength={25}
          value={name}
          onChangeText={name => onNameChange(name)}
        />
        <ClipboardInput>
          <AddressInput
            placeholder="Public Address"
            value={address}
            onChangeText={address => onAddressChange(address.replace(/\s/g, ""))}
          />
          <PasteIcon
            src={require("../../assets/images/icon-camera.png")}
            width="24px"
            height="20px"
            onPress={this.onShowCamera}
          />
        </ClipboardInput>
      </DetailsContainer>
    );
  }
}

export default AddAccountDetails;
