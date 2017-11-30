import * as React from "react";
import { TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import Text from "../components/Text";
import Icon from "../components/Icon";
import { COLOR, SIZE } from "../services/enums";

// --- types --- //
export interface Props {
  onPress: () => void;
}

// --- styling --- //
const DeleteActions = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const CancelText = styled(Text)`
  margin-right: 10px;
  margin-top: -3px;
`;

class ActionsCancelDelete extends React.Component<Props, {}> {
  // --- render --- //
  render() {
    const { onPress, ...props } = this.props;
    return (
      <TouchableWithoutFeedback onPress={onPress} {...props}>
        <DeleteActions>
          <CancelText color={COLOR.red} size={SIZE.small}>
            CANCEL
          </CancelText>
          <Icon
            source={require("../../assets/images/icon-cancel.png")}
            width="27px"
            height="27px"
          />
        </DeleteActions>
      </TouchableWithoutFeedback>
    );
  }
}

export default ActionsCancelDelete;
