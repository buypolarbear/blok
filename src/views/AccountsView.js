/* @flow */
import React, { Component } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import TouchableIcon from "../components/TouchableIcon";

// -- styling --------------------------------------------------------------- //
const AccountActions = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

class AccountsView extends Component<{}> {
  // -- methods ------------------------------------------------------------- //
  onAddAccount = () => console.warn("Add Account");

  onRemoveAccount = () => console.warn("Add Account");

  // -- render -------------------------------------------------------------- //
  render() {
    return (
      <AccountActions>
        <TouchableIcon
          onPress={this.onAddAccount}
          src={require("../../assets/images/icon-add-account.png")}
          width="26px"
          height="26px"
        />
        <TouchableIcon
          onPress={this.onRemoveAccount}
          src={require("../../assets/images/icon-remove-account.png")}
          width="26px"
          height="26px"
        />
      </AccountActions>
    );
  }
}

export default AccountsView;
