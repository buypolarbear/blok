import * as React from "react";
import styled from "styled-components/native";
import AccountCard from "./AccountCard";
import { Accounts } from "../services/interfaces";

// --- types --- //
export interface Props {
  accounts: Accounts.Account[];
  onDelete: (account: Accounts.Account) => void;
  isDeleting: boolean;
  btcPrice: number;
  ethPrice: number;
}

// --- styling --- //
const AccountView = (styled as any).FlatList``;

class AccountsList extends React.Component<Props, {}> {
  // --- methods --- //
  generateItemKey = (account: any, index: number) => `${account.address}-${index}`;

  // --- render --- //
  render() {
    const { accounts, onDelete, isDeleting, btcPrice, ethPrice, ...props } = this.props;
    return (
      <AccountView
        {...props}
        data={accounts}
        keyExtractor={this.generateItemKey}
        renderItem={({ item }: { item: Accounts.Account }) => (
          <AccountCard
            onDelete={onDelete}
            isDeleting={isDeleting}
            account={item}
            btcPrice={btcPrice}
            ethPrice={ethPrice}
          />
        )}
      />
    );
  }
}

export default AccountsList;
