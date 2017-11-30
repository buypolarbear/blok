import * as React from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import { inject, observer } from "mobx-react/native";
import TouchableIcon from "../composites/TouchableIcon";
import Text from "../components/Text";
import AccountCard from "../composites/AccountCard";
import ActionsCancelDelete from "../composites/ActionsCancelDelete";
import ActionsAddRemoveAccount from "../composites/ActionsAddRemoveAccount";
import { COLOR, SIZE } from "../services/enums";
import { formatMoney } from "../services/utilities";
import { Router, Bitcoin, Ethereum, Accounts } from "../services/interfaces";

// --- types --- //
export interface Props {
  router?: Router.RouterStore;
  accounts?: Accounts.AccountsStore;
  btc?: Bitcoin.BitcoinStore;
  eth?: Ethereum.EthereumStore;
}

export interface State {
  isDeleting: boolean;
  transition: Animated.Value;
  deleteActions: boolean;
}

// --- styling --- //
const AccountActions = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;
const AnimatedAccountActions = Animated.createAnimatedComponent(AccountActions);

const BalanceView = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 65px;
`;

const AccountView = (styled as any).FlatList``;

@inject("router", "accounts", "btc", "eth")
@observer
class AccountsView extends React.Component<Props, State> {
  // --- state --- //
  state = {
    isDeleting: false,
    deleteActions: false,
    transition: new Animated.Value(1)
  };

  // --- methods --- //
  onAddAccount = () => this.props.router!.push("/overlay/add-account", { overlay: true });

  onRemoveAccount = () =>
    this.setState({ isDeleting: !this.state.isDeleting }, () => {
      this.state.isDeleting ? this.animate(0, true) : this.animate(0, false);
    });

  animate = (value: number, state: boolean) =>
    Animated.timing(this.state.transition, {
      duration: 100,
      toValue: value,
      useNativeDriver: true
    }).start(() => {
      this.setState({ deleteActions: state }, () => {
        if (value === 0) this.animate(1, state);
      });
    });

  generateItemKey = (account: any, index: number) => `${account.address}-${index}`;

  // --- render --- //
  render() {
    const accounts = [...this.props.btc!.accounts, ...this.props.eth!.accounts];
    const { isDeleting, deleteActions, transition } = this.state;
    let totalBalance = 0;
    accounts.map(account => (totalBalance += account.balance));
    const actions = deleteActions ? (
      <ActionsCancelDelete onPress={this.onRemoveAccount} />
    ) : (
      <ActionsAddRemoveAccount
        onAddAccount={this.onAddAccount}
        onRemoveAccount={this.onRemoveAccount}
      />
    );

    return [
      <AnimatedAccountActions key="account-actions" style={{ opacity: transition }}>
        {actions}
      </AnimatedAccountActions>,
      <BalanceView key="account-balance">
        <Text color={COLOR.grey} shadow>
          Total Balance
        </Text>
        <Text size={SIZE.big} color={COLOR.lightGrey} shadow>
          ${formatMoney(totalBalance * /*TODO currency exchange for alll values*/ 7000)}
        </Text>
      </BalanceView>,
      <AccountView
        key="account-list"
        data={accounts}
        keyExtractor={this.generateItemKey}
        renderItem={({ item }: { item: Accounts.Account }) => (
          <AccountCard
            onDelete={this.props.accounts!.deleteAccount}
            isDeleting={isDeleting}
            account={item}
          />
        )}
      />
    ];
  }
}

export default AccountsView;
