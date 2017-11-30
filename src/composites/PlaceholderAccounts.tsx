import * as React from "react";
import styled from "styled-components/native";
import Icon from "../components/Icon";
import ButtonGradient from "./ButtonGradient";
import Text from "../components/Text";
import { SIZE } from "../services/enums";

// --- types --- //
export interface Props {
  onAddAccount: () => void;
}

// --- styling --- //
const Container = styled.View`
  width: 100%;
  margin-top: 20px;
  align-items: center;
`;

const ActionCall = styled(Text)`
  margin-top: 10px;
  margin-bottom: 40px;
`;

class PlaceholderAccounts extends React.Component<Props, State> {
  // --- render --- //
  render() {
    const { onAddAccount, ...props } = this.props;
    return (
      <Container {...props}>
        <Icon
          source={require("../../assets/images/placeholder-accounts.png")}
          width="220px"
          height="143px"
        />
        <ActionCall size={SIZE.small}>No accounts created yet</ActionCall>
        <ButtonGradient text="CREATE" onPress={onAddAccount} />
      </Container>
    );
  }
}

export default PlaceholderAccounts;
