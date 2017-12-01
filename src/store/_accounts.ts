import { observable, action } from "mobx";
import { Alert } from "react-native";
import { TICKER, EXCHANGE } from "../services/enums";
import { alertError, getPrice } from "../services/utilities";
import { Accounts } from "../services/interfaces";
import { apiGetExchangeRate } from "../services/api";

class AccountsStore implements Accounts.AccountsStore {
  // -- constructor -- //
  router: Accounts.AccountsStore["router"];
  btc: Accounts.AccountsStore["btc"];
  eth: Accounts.AccountsStore["eth"];

  constructor(
    router: Accounts.AccountsStore["router"],
    btc: Accounts.AccountsStore["btc"],
    eth: Accounts.AccountsStore["eth"]
  ) {
    this.router = router;
    this.btc = btc;
    this.eth = eth;
  }

  // --- store --- //
  @observable fetching = false;
  @observable exchange = EXCHANGE.USD;
  @observable btcPrice = 0;
  @observable ethPrice = 0;

  // --- actions --- //
  @action setFetching = (state: boolean) => (this.fetching = state);
  @action updateBtcPrice = (price: number) => (this.btcPrice = price);
  @action updateEthPrice = (price: number) => (this.ethPrice = price);

  // --- methods --- //
  getAccountsFromMemory = async () => {
    try {
      this.setFetching(true);
      await this.btc.getStoreFromMemory();
      await this.eth.getStoreFromMemory();
      if (!!this.btc.accounts.length) {
        const { data: btcData } = await apiGetExchangeRate("bitcoin", this.exchange);
        this.updateBtcPrice(Number(getPrice(btcData[0], this.exchange)));
      }
      if (!!this.eth.accounts.length) {
        const { data: ethData } = await apiGetExchangeRate("ethereum", this.exchange);
        this.updateEthPrice(Number(getPrice(ethData[0], this.exchange)));
      }
      this.setFetching(false);
    } catch (e) {
      this.setFetching(false);
      console.warn(e);
      alertError(e.message);
    }
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

  confirmDeleteAccount = (callback: (address: string) => void, account: Accounts.Account) =>
    Alert.alert("Confirmation", `Are you sure you want to delete "${account.name}"?`, [
      { text: "Cancel", onPress: () => null },
      { text: "Delete", onPress: () => callback(account.address), style: "destructive" }
    ]);

  deleteAccount = async (account: Accounts.Account) => {
    try {
      switch (account.type) {
        case TICKER.BTC:
          return this.confirmDeleteAccount(this.btc.deleteAccount, account);
        case TICKER.ETH:
          return this.confirmDeleteAccount(this.eth.deleteAccount, account);
        default:
          throw new Error("Invalid account type");
      }
    } catch (e) {
      console.warn(e);
      alertError(e.message);
    }
  };
}

export default AccountsStore;
