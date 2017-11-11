import * as React from "react";
import styled from "styled-components/native";
import { inject, observer } from "mobx-react/native";
import TouchableIcon from "../composites/TouchableIcon";
import Text from "../components/Text";
import AccountCard from "../composites/AccountCard";
import { COLOR, SIZE } from "../services/enums";
import { RouterInterface } from "../store/_router";
import { AccountInterface, AccountsInterface } from "../store/_accounts";

// --- types --- //
export interface Props {
  router?: RouterInterface;
  accounts?: AccountsInterface;
}

// --- styling --- //
const AccountActions = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const BalanceView = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 65px;
`;

const AccountView = (styled as any).FlatList``;

@inject("router", "accounts")
@observer
class AccountsView extends React.Component<Props, {}> {
  // --- methods --- //
  onAddAccount = () => this.props.router.push("/overlay/add-account", { overlay: true });

  onRemoveAccount = () => console.warn("Remove Account");

  generateItemKey = (account: AccountInterface, index: number) =>
    `${account.publicAddress}-${index}`;

  // --- render --- //
  render() {
    return [
      <AccountActions key="account-actions">
        <TouchableIcon
          onPress={this.onAddAccount}
          src={require("../../assets/images/icon-add-account.png")}
          width="27px"
          height="27px"
        />
        <TouchableIcon
          onPress={this.onRemoveAccount}
          src={require("../../assets/images/icon-remove-account.png")}
          width="27px"
          height="27px"
        />
      </AccountActions>,
      <BalanceView key="account-balance">
        <Text color={COLOR.grey} shadow>
          Total Balance
        </Text>
        <Text size={SIZE.big} shadow>
          $1,280
        </Text>
      </BalanceView>,
      <AccountView
        key="account-list"
        data={this.props.accounts.accounts}
        keyExtractor={this.generateItemKey}
        renderItem={({ item }) => <AccountCard account={item} />}
      />
    ];
  }
}

export default AccountsView;
