/* @flow */
import React, { Component } from "react";
import styled from "styled-components/native";
import TouchableIcon from "../components/TouchableIcon";
import Text from "../components/Text";

// -- styling --------------------------------------------------------------- //
const AccountActions = styled.View`
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
    return [
      <AccountActions key="account-actions">
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
      </AccountActions>,
      <Text key="account-balance">small text</Text>
    ];
  }
}

export default AccountsView;
