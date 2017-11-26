import * as React from "react";
import { inject, observer } from "mobx-react/native";
import styled from "styled-components/native";
import Camera from "react-native-camera";
import ButtonGradient from "../composites/ButtonGradient";
import { CameraStoreInterface } from "../store/_camera";
import { isIphoneX } from "../services/utilities";

// --- types --- //
export interface Props {
  camera?: CameraStoreInterface;
}

// --- styles --- //
const CameraOverlay = styled(Camera)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 15;
`;

const Cancel = styled(ButtonGradient)`
  position: absolute;
  bottom: ${isIphoneX() ? "40px" : "20px"};
  align-self: center;
`;

@inject("camera")
@observer
class CameraView extends React.Component<Props, {}> {
  // --- methods --- //
  onBarcode = event => {
    const qrISO = "ORG.ISO.QRCODE";
    if (event.type.toUpperCase() === qrISO && event.data !== this.props.camera.barcode)
      this.props.camera.setBarcode(event.data);
  };

  // --- render --- //
  render() {
    const { camera, ...props } = this.props;
    return camera.show ? (
      <CameraOverlay
        onBarCodeRead={this.onBarcode}
        aspect={Camera.constants.Aspect.fill}
        {...props}
      >
        <Cancel secondary text="CANCEL" onPress={() => camera.toggleCamera(false)} />
      </CameraOverlay>
    ) : null;
  }
}

export default CameraView;
