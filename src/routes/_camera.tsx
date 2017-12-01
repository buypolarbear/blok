import * as React from "react";
import { Animated } from "react-native";
import { inject, observer } from "mobx-react/native";
import { reaction } from "mobx";
import styled from "styled-components/native";
import Camera from "react-native-camera";
import ButtonOpaque from "../composites/ButtonOpaque";
import { isIphoneX } from "../services/utilities";
import Text from "../components/Text";
import { COLOR } from "../services/enums";
import { Camera as Cameras } from "../services/interfaces";

// --- types --- //
export interface Props {
  camera?: Cameras.CameraStore;
}

export interface State {
  transition: Animated.Value;
}

// --- styles --- //
const CameraOverlay = styled(Camera)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  z-index: 15;
`;

const AnimatedCameraOverlay = Animated.createAnimatedComponent(CameraOverlay);

const Cancel = styled(ButtonOpaque)`
  position: absolute;
  bottom: ${isIphoneX() ? "40px" : "20px"};
  align-self: center;
`;

const Tip = styled(Text)`
  position: absolute;
  top: ${isIphoneX() ? "60px" : "40px"};
  align-self: center;
`;

@inject("camera")
@observer
class CameraView extends React.Component<Props, State> {
  visibilityListener: Function;

  // -- state -- //
  state = {
    transition: new Animated.Value(0)
  };

  // --- methods --- //
  componentDidMount() {
    this.visibilityListener = reaction(
      () => this.props.camera!.show,
      () => {
        if (this.props.camera!.show) this.camera();
      }
    );
  }

  componentWillUnmount() {
    this.visibilityListener();
  }

  camera = () => {
    this.setState({ transition: new Animated.Value(0) }, () => {
      Animated.timing(this.state.transition, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start();
    });
  };

  onBarcode = (event: { data: string; type: string }) => {
    const qrISO = "ORG.ISO.QRCODE";
    if (event.type.toUpperCase() === qrISO && event.data !== this.props.camera!.barcode)
      this.props.camera!.setBarcode(event.data);
  };

  // --- render --- //
  render() {
    const { camera, ...props } = this.props;
    const { transition } = this.state;
    return camera!.show ? (
      <AnimatedCameraOverlay
        style={{ opacity: transition }}
        onBarCodeRead={this.onBarcode}
        aspect={Camera.constants.Aspect.fill}
        {...props}
      >
        <Tip shadow color={COLOR.white}>
          Point Camera at a QR Code
        </Tip>
        <Cancel text="CANCEL" onPress={() => camera!.toggleCamera(false)} />
      </AnimatedCameraOverlay>
    ) : null;
  }
}

export default CameraView;
