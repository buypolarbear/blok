import { observable, action } from "mobx";
import { Alert } from "react-native";
import { RouterStoreInterface } from "./_router";
import { BtcStoreInterface } from "./_btc";
import { EthStoreInterface } from "./_eth";
import { TICKER } from "../services/enums";

export interface AccountsStoreInterface {
  fetching: boolean;
  addAccount: (type: TICKER, name: string, address: string) => void;
  deleteAccount: (account: any) => void;
  setFetching: (state: boolean) => void;
  getAccountsFromMemory: () => void;
}

class AccountsStore implements AccountsStoreInterface {
  // -- constructor -- //
  private router: RouterStoreInterface;
  private btc: BtcStoreInterface;
  private eth: EthStoreInterface;

  constructor(router: RouterStoreInterface, btc: BtcStoreInterface, eth: EthStoreInterface) {
    this.router = router;
    this.btc = btc;
    this.eth = eth;
  }

  // --- store --- //
  @observable fetching = false;

  // --- actions --- //
  @action setFetching = state => (this.fetching = state);

  // --- methods --- //
  public getAccountsFromMemory = async () => {
    try {
      this.setFetching(true);
      await this.btc.getBtcStoreFromMemory();
      await this.eth.getEthStoreFromMemory();
      this.setFetching(false);
    } catch (e) {
      this.setFetching(false);
      console.error(e);
    }
  };

  public addAccount = async (type, name, address) => {
    try {
      this.setFetching(true);
      switch (type) {
        case TICKER.BTC:
          await this.btc.addBtcAccount(name, address);
          break;
        case TICKER.ETH:
          await this.eth.addEthAccount(name, address);
          break;
        default:
          throw new Error("INVALID ACCOUNT TYPE");
      }
      this.setFetching(false);
      this.router.push("/dashboard/accounts");
    } catch (error) {
      this.setFetching(false);
      console.error(error);
    }
  };

  confirmDeleteAccount = (callback, account) =>
    Alert.alert("Confirmation", `Are you sure you want to delete "${account.name}"?`, [
      { text: "Delete", onPress: () => callback(account.address), style: "destructive" },
      { text: "Cancel", onPress: null }
    ]);

  public deleteAccount = async account => {
    try {
      switch (account.type) {
        case TICKER.BTC:
          this.confirmDeleteAccount(this.btc.deleteBtcAccount, account);
          break;
        default:
          throw new Error("INVALID ACCOUNT TYPE");
      }
    } catch (e) {
      console.error(e);
    }
  };
}

export default AccountsStore;
