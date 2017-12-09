import { observable, action } from "mobx";
import { Alert, AsyncStorage } from "react-native";
import { TICKER } from "../services/enums";
import { alertError } from "../services/utilities";
import { Accounts, Market, Router, Bitcoin, Ethereum } from "../services/interfaces";

class AccountsStore implements Accounts.AccountsStore {
  // -- constructor -- //
  router: Router.RouterStore;
  market: Market.MarketStore;
  btc: Bitcoin.BitcoinStore;
  eth: Ethereum.EthereumStore;

  constructor(
    router: Router.RouterStore,
    market: Market.MarketStore,
    btc: Bitcoin.BitcoinStore,
    eth: Ethereum.EthereumStore
  ) {
    this.router = router;
    this.market = market;
    this.btc = btc;
    this.eth = eth;
  }

  // --- store --- //
  @observable fetching = false;

  // --- actions --- //
  @action setFetching = (state: boolean) => (this.fetching = state);

  // --- methods --- //
  bootstrap = async () => {
    try {
      this.setFetching(true);
      await this.syncDataFromDevice();
      await this.refreshData();
      this.setFetching(false);
    } catch (e) {
      this.setFetching(false);
      console.warn(e);
      alertError(e.message);
    }
  };

  syncDataFromDevice = async () => {
    // TODO Promise.all ?
    await this.btc.syncDataFromDevice();
    await this.eth.syncDataFromDevice();
  };

  refreshData = async () => {
    // TODO Promise.all ?
    await this.btc.refreshAccounts();
    await this.eth.refreshAccounts();
  };

  addAccount = async (type: TICKER | null, name: string, address: string) => {
    try {
      this.setFetching(true);
      switch (type) {
        case TICKER.BTC:
          await this.btc.addAccount(name, address);
          break;
        case TICKER.ETH:
          await this.eth.addAccount(name, address);
          break;
        default:
          throw new Error("Invalid account type");
      }
      this.setFetching(false);
      this.router.push("/dashboard/accounts");
    } catch (e) {
      this.setFetching(false);
      console.warn(e);
      alertError(e.message);
    }
  };

  deleteAccount = async (account: Accounts.Account) => {
    try {
      switch (account.type) {
        case TICKER.BTC:
          return this.confirmDeleteAccount(this.btc.deleteAccount, account);
        case TICKER.ETH:
          return this.confirmDeleteAccount(this.eth.deleteAccount, account);
        default:
          throw new Error(`Invalid account type ${account.type}`);
      }
    } catch (e) {
      console.warn(e);
      alertError(e.message);
    }
  };

  confirmDeleteAccount = (callback: (address: string) => void, account: Accounts.Account) =>
    Alert.alert("Confirmation", `Are you sure you want to delete "${account.name}"?`, [
      { text: "Cancel", onPress: () => null },
      { text: "Delete", onPress: () => callback(account.address), style: "destructive" }
    ]);

  setRefreshDelay = async () =>
    await AsyncStorage.setItem("@blok:AccountsStore", JSON.stringify({ delay: Date.now() }));

  getRefreshDelay = async () => {
    const data = await AsyncStorage.getItem("@blok:AccountsStore");
    return JSON.parse(data) || null;
  };
}

export default AccountsStore;
