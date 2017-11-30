import { observable, action } from "mobx";
import { Alert } from "react-native";
import { TICKER } from "../services/enums";
import { alertError } from "../services/utilities";
import { Accounts } from "../services/interfaces";

class AccountsStore implements Accounts.AccountsStore {
  // -- constructor -- //
  router;
  btc;
  eth;

  constructor(router, btc, eth) {
    this.router = router;
    this.btc = btc;
    this.eth = eth;
  }

  // --- store --- //
  @observable fetching = false;

  // --- actions --- //
  @action setFetching = state => (this.fetching = state);

  // --- methods --- //
  getAccountsFromMemory = async () => {
    try {
      this.setFetching(true);
      await this.btc.getStoreFromMemory();
      await this.eth.getStoreFromMemory();
      this.setFetching(false);
    } catch (e) {
      this.setFetching(false);
      console.warn(e);
      alertError(e.message);
    }
  };

  addAccount = async (type, name, address) => {
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

  confirmDeleteAccount = (callback, account) =>
    Alert.alert("Confirmation", `Are you sure you want to delete "${account.name}"?`, [
      { text: "Cancel", onPress: null },
      { text: "Delete", onPress: () => callback(account.address), style: "destructive" }
    ]);

  deleteAccount = async account => {
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
