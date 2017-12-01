import * as React from "react";
import styled from "styled-components/native";
import Icon from "../components/Icon";
import ButtonGradient from "./ButtonGradient";
import { height } from "../style/dimension";

// --- types --- //
export interface Props {
  onAddAccount: () => void;
  onReset: () => void;
}

// --- styling --- //
const Container = styled.View`
  width: 100%;
  align-items: center;
  height: 223px;
  position: absolute;
  top: ${height / 2}px;
  margin-top: -111.5px;
  align-self: center;
`;

const Action = styled(ButtonGradient)`
  margin-top: 40px;
`;

class PlaceholderAccounts extends React.Component<Props, {}> {
  // --- methods --- //
  componentDidMount() {
    this.props.onReset();
  }

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
        <Action text="ADD ACCOUNT" onPress={onAddAccount} large />
      </Container>
    );
  }
}

export default PlaceholderAccounts;
