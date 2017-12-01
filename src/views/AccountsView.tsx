import * as React from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import { inject, observer } from "mobx-react/native";
import PlaceholderAccounts from "../composites/PlaceholderAccounts";
import AccountsList from "../composites/AccountsList";
import Text from "../components/Text";
import ActionsCancelDelete from "../composites/ActionsCancelDelete";
import ActionsAddRemoveAccount from "../composites/ActionsAddRemoveAccount";
import { COLOR, SIZE, TICKER } from "../services/enums";
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
  onAddAccount = () => {
    if (this.props.router!.location.pathname !== "/overlay/add-account") {
      this.props.router!.push("/overlay/add-account", { overlay: true });
    }
  };

  onRemoveAccount = () => {
    this.setState({ isDeleting: !this.state.isDeleting }, () => {
      this.state.isDeleting ? this.animate(0, true) : this.animate(0, false);
    });
  };

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

  onReset = () =>
    this.setState({
      isDeleting: false,
      deleteActions: false
    });

  // --- render --- //
  render() {
    const { btc, eth, accounts: acc } = this.props;
    const { isDeleting, deleteActions, transition } = this.state;
    const accounts = [...btc!.accounts, ...eth!.accounts];
    const hasAccounts = accounts.length > 0;
    let totalBalance = 0;
    accounts.map(account => {
      switch (account.type) {
        case TICKER.BTC:
          return (totalBalance += account.balance * acc!.btcPrice);
        case TICKER.ETH:
          return (totalBalance += account.balance * acc!.ethPrice);
        default:
          return totalBalance;
      }
    });
    const actions = deleteActions ? (
      <ActionsCancelDelete onPress={this.onRemoveAccount} />
    ) : (
      <ActionsAddRemoveAccount
        onAddAccount={this.onAddAccount}
        onRemoveAccount={this.onRemoveAccount}
      />
    );
    const view = hasAccounts ? (
      <AccountsList
        key="account-list"
        accounts={accounts}
        onDelete={acc!.deleteAccount}
        isDeleting={isDeleting}
        btcPrice={acc!.btcPrice}
        ethPrice={acc!.ethPrice}
      />
    ) : (
      <PlaceholderAccounts
        onReset={this.onReset}
        onAddAccount={this.onAddAccount}
        key="placeholder-accounts"
      />
    );

    return [
      <AnimatedAccountActions
        key="account-actions"
        pointerEvents={hasAccounts ? "auto" : "none"}
        style={{ opacity: hasAccounts ? transition : 0 }}
      >
        {actions}
      </AnimatedAccountActions>,
      <BalanceView key="account-balance">
        <Text color={COLOR.grey} shadow>
          Total Balance
        </Text>
        <Text size={SIZE.big} color={COLOR.lightGrey} shadow>
          ${formatMoney(totalBalance)}
        </Text>
      </BalanceView>,
      view
    ];
  }
}

export default AccountsView;
