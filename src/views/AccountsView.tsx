import * as React from "react";
import styled from "styled-components/native";
import TouchableIcon from "../composites/TouchableIcon";
import Text from "../components/Text";
import AccountCard from "../composites/AccountCard";
import { COLOR, SIZE, TICKER } from "../services/enums";

const dummyData = [
  TICKER.BTC,
  TICKER.LTC,
  TICKER.ETH,
  TICKER.XRP,
  TICKER.DASH,
  TICKER.STEEM,
  TICKER.BTC,
  TICKER.LTC,
  TICKER.ETH,
  TICKER.XRP,
  TICKER.DASH,
  TICKER.STEEM
];

// -- styling --------------------------------------------------------------- //
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

class AccountsView extends React.Component<{}, {}> {
  // -- methods ------------------------------------------------------------- //
  onAddAccount = () => console.warn("Add Account");

  onRemoveAccount = () => console.warn("Remove Account");

  generateItemKey = (item: string, index: number) => `${item}-${index}`;

  // -- render -------------------------------------------------------------- //
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
        data={dummyData}
        keyExtractor={this.generateItemKey}
        renderItem={({ item }) => <AccountCard type={item} />}
      />
    ];
  }
}

export default AccountsView;
